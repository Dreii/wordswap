import io from 'socket.io-client'
const socketUrl = "http://localhost:3231"
let baseUrl = ''

class API{
  static login(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/login', payload))
  }

  static signup(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/signup', payload))
  }

  static fbLogin(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/fb-login', payload))
  }

  static submitUsername(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/submit-username', payload))
  }

  static connectSocket = (userID) => {
    console.log("attempting connection");
    const socket = io(socketUrl)
    socket.on('connect', ()=>{
      socket.emit('USER_CONNECTED', userID)
      console.log("Connected")
    })
    // 
    // socket.on('MATCH_UPDATED', (matchData)=>{
    //   console.log("starting", matchData)
    // })
    return socket
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
