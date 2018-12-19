import io from 'socket.io-client'
const socketUrl = `http://${window.location.hostname}:3231`
let baseUrl = ''

class API{
  static Login(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/login', payload))
  }

  static Signup(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/signup', payload))
  }

  static FBLogin(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/fb-login', payload))
  }

  static SubmitUsername(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/submit-username', payload))
  }

  static ConnectSocket = (userID) => {
    return new Promise((resolve, reject)=>{
      console.log("attempting connection")
      const socket = io(socketUrl)
      socket.on('connect', ()=>{
        socket.emit('USER_CONNECTED', userID)
        console.log("Connected")
        resolve(socket)
      })

      socket.on('error', (err)=>{
        reject(err)
      })
    })
  }


  static LookForMatch = (socket, userID) => {
    return new Promise((resolve, reject) => {
      socket.emit('USER_LOOKING_FOR_MATCH', userID)
      socket.on('MATCH_FOUND', (match)=>{
        console.log("match found", match)
        resolve({
          match,
          error: null,
        })
      })

      window.setTimeout(()=>{
        resolve({error: "The server is not responding."})
      }, 10*1000)

      socket.on('ERROR', (err)=>resolve({
        error: "There was an error: "+err
      }))
    })
  }

  static LeaveMatch = (socket, userID) => {
      socket.emit('USER_LEAVING_MATCH', userID)
  }

  static handleResponse(promise){
    // let token
    return promise
      .then(response => {
        // token = response.headers.get('x-access-token')
        // console.log(response)
        return response.json()
      })
      .then((body) => {
        // console.log(body);
        if(body.error) throw Error(body.error)

        return {token:body.token, data: body.data};
      })
  }
}

API.postData = {
   method: "POST",
   headers:{
     accept: "application/json",
     "Content-type": "application/json",
   }
}

API.subscriptions = [];

export default API;
