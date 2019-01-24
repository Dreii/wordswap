import API from '../../../../functions/api'
import TimerFunctions from './TimerFunctions'

function MatchMount(){
  let props = {...this.props.pathProps, ...this.props.matchProps}
  //extend the update match function to also update the waiting for opponent state
  let UpdateMatchExt = (newMatch) => {
    props.UpdateMatch(newMatch)
    this.setState({waitingForOpponent: false})
  }
  //If there is no current match data (the player is returning from a disconnect)
  //then we need to go and find a new match on the server
  if(!this.props.matchProps.match){
    LookForNewMatch(props.socket, props.user._id, UpdateMatchExt)
  }


  //When a match update comes from the server, we need to translate that to the local store
  //we also need to reset the timer on the match object when the round is after the first
  ReceiveMatchUpdates(props.socket, UpdateMatchExt, TimerFunctions.SetTimer.bind(this))


  //When a match finished message comes in, we need to perform clean up on the match store,
  //as well as update leaderboard information
  ProcessMatchCompletion(props.socket, props.user, props.leaderboard, UpdateMatchExt, props.SetUserGlobalState, props.SetLeaderboardGlobalState, TimerFunctions.ClearTimer.bind(this))

  //add this function to the component 'this' since we need to use it for unbinding later
  this.SendTestWin = SendTestWin

  //Bind a function so that spacebar sends an automatic win to the server, for testing purposes only, remove eventually
  SetupTestWin.call(this)
}

export default MatchMount






async function LookForNewMatch(socket, userID, UpdateMatchExt){
  let newMatch = await API.LookForMatch(socket, userID)
  console.log("MATCH FOUND", newMatch)
  UpdateMatchExt(newMatch)
}





function ReceiveMatchUpdates(socket, UpdateMatchExt, SetTimer){
  //listen for match updates
  socket.on("MATCH_UPDATED", (newMatch) => {
    console.log("MATCH UPDATED", newMatch)

    //update the clientside match store
    UpdateMatchExt(newMatch)

    //when update is found, set the timer to 0 and start it, if the round isnt the first
    SetTimer()
  })
}





function ProcessMatchCompletion(socket, user, oldLeaderboardData, UpdateMatchExt, SetUserGlobalState, SetLeaderboardGlobalState, ClearTimer){
  //Listen for matched finished messages
  socket.on('MATCH_FINISHED', (match, leaderBoardData) => {
    //if a match finished message comes in,
    //add the previous matches opponent to the list of recent opponents for this user (used in searching for friends)
    //but only if its not already there
    let opponent = match.playerOne._id === user._id ? match.playerTwo : match.playerOne
    if(user.recentOpponents.find(ro => ro._id === opponent._id) === undefined) user.recentOpponents.push(opponent)
    while(user.recentOpponents.length > 20) user.recentOpponents.shift()


    console.log("MATCH FINISHED")
    //update the match, user, and leaderboard client stores with the new data.
    UpdateMatchExt(match)
    SetUserGlobalState({...user})
    SetLeaderboardGlobalState(leaderBoardData || oldLeaderboardData)
    ClearTimer()
  })
}





function SetupTestWin(){
  //bind the keyup event to listen for the " " key (spacebar)
  document.addEventListener("keyup", SendTestWin.bind(this))
}


function SendTestWin(e){
  //if spacebar is pressed and there is a second player in the match document
  //then send out a fake turn with the win code set up on the server
  if(e.key === " " && this.props.matchProps.match.playerTwo !== undefined){
    let data = JSON.stringify({
      matchID: this.props.matchProps.match._id,
      player: this.props.matchProps.match.playerOne._id === this.props.pathProps.user._id ? 1 : 2,
      word: "ILILILILILILILILILLIILILILILILILILILILILILILILILILILILILI"
    })
    API.SendTurn(this.props.pathProps.socket, data)
  }
}
