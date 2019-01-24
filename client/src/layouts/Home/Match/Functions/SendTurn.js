import API from '../../../../functions/api'
import TimerFunctions from './TimerFunctions'
import ShakePlayerInputError from './ShakePlayerInputError'

export async function SendTurn(){
  let props = {...this.props.pathProps, ...this.props.matchProps}

  let requiredLetter = GetRequiredLetter(props.match, props.user._id)
  let word = await CheckWordOnline.call(this, props.socket, this.state.playerInput, requiredLetter)

  if(word.length > 0){
    this.setState({playerInput: '', playerInputError: ""})

    let data = {
      matchID: props.match._id,
      player: props.match.playerOne._id === props.user._id ? 1 : 2,
      word
    }

    TimerFunctions.ClearTimer.call(this)
    data = JSON.stringify(data)
    API.SendTurn(props.socket, data)
  }
}

export function GetRequiredLetter(match, userID){
  let inGame = match.round > 0,
      requiredLetter = ''

  if(inGame){
    let playerOne = match.playerOne._id,
    enemyHist = (playerOne === userID) ? match.playerTwoHist : match.playerOneHist,
    lastWord = enemyHist[enemyHist.length-1]

    requiredLetter = lastWord.charAt(lastWord.length-1)
  }

  return requiredLetter
}

export async function CheckWordOnline(socket, word, requiredLetter){
  word = CheckWordOffline.call(this, word, requiredLetter)
  if(word.length > 0){
    socket.emit("USER_CHECKING_WORD", word)
    return await new Promise((resolve, reject) => {
      socket.on("WORD_VALIDATION_RESPONSE", (res, err) => {
        if(res === '') {
          ShakePlayerInputError.call(this)
          this.setState({playerInputError: word+" is not in the dictionary"})
        }
        resolve(res)
      })
    })
  }
  return ''
}

export function CheckWordOffline(word, requiredLetter){
  if(/^[a-z]+$/i.test(word) || word === '') {
    if(requiredLetter === '' || word === '' || word.charAt(0).toLowerCase() === requiredLetter.toLowerCase()){
      if(this.state.playerInputError !== '') this.setState({playerInputError: ''})
      return word
    }else{
      ShakePlayerInputError.call(this)
      this.setState({playerInputError: "You must start your word with "+requiredLetter})
      return ''
    }
  }else{
    ShakePlayerInputError.call(this)
    this.setState({playerInputError: "No Special Characters!"})
    return word.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>0-9 {}[]\\\/]/gi, '', 'QQQQ')
  }
}
