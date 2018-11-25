let baseUrl = ''

class API{
  static auth(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/login', payload))
  }

  static handleResponse(promise){
    let token
    return promise
      .then(response => {
        token = response.headers.get('x-access-token')
        console.log(response)
        return response.json()
      })
      .then((body) => {
        console.log(body);
        if(body.error) throw Error(body.error)

        return {token, body: body.data};
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
