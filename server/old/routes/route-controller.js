module.exports = function(app){
  console.log("routing...");
  for(let schema in app.db.schemas){
    if(!app.db.schemas.hasOwnProperty(schema)) continue

    app.post(`/${schema}`, (req, res) => {
      let body = req.body
      if(!Array.isArray(body)) body = [body]
      let token = req.headers['x-access-token']

      require('./functions/checkAuthToken')(app, token, true)
      .then(() => {
        //do initial requests (non link)
        let documents = []
        body.forEach((instance, i)=>{
          if(instance.request === undefined) throw new Error('Request requires "request" object.')

          let expect = instance.expect,
          populate = []
          for(let field in expect){
            if(expect[field] === "populate"){
              if(instance.request.type === "read" || instance.request.type === "read-multi"){
                populate.push(field)
              }else{
                throw new Error('Can only populate expects in read or read-multi requests')
              }
            }
          }

          let doc = app.db.functions[instance.request.type](app.db.schemas[schema],instance.request.identifier , instance.request.data, populate, app)
          documents.push(doc)
        })
        return Promise.all(documents)
      })
      .then(documents => {
        //do link requests
        let links = []
        if(!documents || documents[0] === null) throw new Error('Could not find any documents with that ID')

        body.forEach((instance, i)=>{
          let link = instance.request.link
          if(!Array.isArray(link)) link = [link];

          link.forEach((singleLink)=>{
            if(singleLink !== undefined){
              if(singleLink.type === undefined) throw new Error('Link object needs "type" field.')
              if(singleLink.to === undefined) throw new Error('Link object needs "to" field.')
              if(singleLink.where === undefined) throw new Error('Link object needs "where" field.')
              if(singleLink.schema === undefined) throw new Error('Link object needs "schema" field.')

              let to = singleLink.to
              if(to !== undefined){
                if(to === "self") to = documents[i]._id
                if(to === "last"){
                  if(i> 0)
                    to = documents[i-1]._id
                  else
                    throw new error('Cannot link to last query in the first query.')
                }
              }

              let from = documents[i]._id
              if(singleLink.from !== undefined){
                if(singleLink.from === "self") from = documents[i]._id
                if(singleLink.from === "last"){
                  if(i> 0){
                    from = documents[i-1]._id
                  }
                  else{
                    throw new error('Cannot link from last query in the first query.')
                  }
                }
                else from = singleLink.from
              }

              links.push(app.db.functions['link'](app.db.schemas[singleLink.schema], to, from, singleLink.where, singleLink.type))
            }
          })
        })

        return Promise.all(documents.concat(links))
        .then(() => documents)
      })
      .then(documents => {
        //do graphlike return
        res.json(require('./functions/prepareGraphLikeReturn')(app, body, documents))
      })
      .catch((err) => {
        console.log(err)
        res.json({error: err.message})
      })
    })
  }

  //extra route for testing api
  app.get(`/api`, (req, res) => res.json({message: 'API connection successful.'}))

  //routes for signup and authentication, neccesary to get an auth token and interact with the rest
  //of the API
  require('./functions/authEntryRoutes')(app)
}


// body:{
//   request:{
//     type: //what kind of request is this? CRUD
//     identifier: //for operations like update and delete, takes string or array of string id's
//     data: {
//       field: data,
//     }
//     link: [{
//       type: //push or set
// 	     where: //the exact field that we are linking to
//     }]
//     object with data for updating/creating
//   },
//   expect:{
//     //a copy of the object and data you want returned should be here
//     field:true,
//   },
//   options:{
//     subscribe: object or array of objects {schema:aaaa, id:bbbb }
//   }
// }
