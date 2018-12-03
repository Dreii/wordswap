//A class of database helpers
class DatabaseController{
  constructor(){
    //prepate the generate schema function and set the path we will find files in to be schemas
    const generateSchema = require('./functions/generateSchema');
    let normalizedPath = require('path').join(__dirname, "schemas")

    this.models = {}
    this.schemas = {}

    //search through all files in the schemas path and generate schema's for each
    require("fs").readdirSync(normalizedPath).forEach((file) => {
      let rawData = require('./Schemas/' + file)
      this.models[rawData.name] = rawData.model
      console.log(rawData.name)
      this.schemas[rawData.name] = generateSchema(rawData.name, rawData.model)
    })

    //get all default read and write functions for use with our schemas
    this.functions = {
      verify: require('./functions/auth/verify')(this),
      checkFBID: require('./functions/auth/checkFBID')(this),
      checkFBToken: require('./functions/auth/checkFBToken'),
      authenticate: require('./functions/auth/authenticate')(this),
      createUser: require('./functions/auth/create-user')(this),
      updateUser: require('./functions/update-user')(this)
    }

    //create a function initialize the database connection later
    this.init = () => {
       require('./functions/initiateConnection')();
    }
  }
}

module.exports = new DatabaseController();
