const mongoose = require('mongoose');

module.exports = (app, body, documentData) => {
  returnObject = {error: ''}

  // console.log(documentData, body);

  //If the documentData is not an array, make it into one
  //so that its compatible with the function either way.
  if(!Array.isArray(documentData)) documentData = [documentData]

  //prepare the return object that will eventually hold the requested data
  returnObject.data = [];
  let expect

  //cycle through the document data, looking at each request
  for(let i=0; i<documentData.length; i++){

    //push a new empty object to the return object,
    //create an empty array to store any Promises we get from detecting promises
    returnObject.data.push({})
    let promiseList = [];
    //get the expect data for this request
    expect = body[i].expect

    //cycle through every field in the expect object
    for(let field in expect){
      //skip parent fields
      if(!expect.hasOwnProperty(field)) continue

      //if the expect field does not exist in the original document, throw error
      if(documentData[i][field] === undefined)
        returnObject.error = new Error(`Non exsistent field requested: ${field}`).toString()
      else{
        returnObject.data[i][field] = documentData[i][field]
      }
    }
  }

  //if the returnObject array is only one entry then just return the entry without an array.
  if(returnObject.data.length === 1) returnObject.data = returnObject.data[0]
  // console.log(returnObject);
  return(returnObject)
}
