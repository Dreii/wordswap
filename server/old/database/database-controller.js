//A class of database helpers
class DatabaseController{
  constructor(){

    const generateSchema = require('./functions/generateSchema');

    let normalizedPath = require('path').join(__dirname, "schemas")
    this.models = {};
    this.schemas = {};

    require("fs").readdirSync(normalizedPath).forEach((file) => {
      let rawData = require('./Schemas/' + file)
      this.models[rawData.name] = rawData.model
      this.schemas[rawData.name] = generateSchema(rawData.name, rawData.model)
    })

    this.functions = require('./functions/defaultFunctions');

    normalizedPath = require('path').join(__dirname, "schemaFunctions")

    require("fs").readdirSync(normalizedPath).forEach((file) => {
      let rawData = require('./schemaFunctions/' + file)
      let name = file.substr(0, file.length-3)
      this.functions[name] = rawData
    })

    this.authSchema = this.schemas.User

    this.init = () => {
       //Initiate connection to database
       require('./functions/initiateConnection')();
    }
  }
}

module.exports = new DatabaseController();
