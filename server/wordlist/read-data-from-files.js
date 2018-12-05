const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

module.exports = () => readdir(__dirname+'/new-lists').then(files => {
  fileList = []
  files.forEach((file)=>{
    fileList.push(readChunks(file))
  })
  return Promise.all(fileList)
})

async function readChunks (file) {
  return new Promise(resolve => {
    let header
    const label = `read2-${file}`
    console.time(label)
    const stream = fs.readFile(__dirname+'/new-lists/'+file, {encoding: 'utf8'},(err, data)=>{
      if(err)console.log(err)
      data = data.split(',\n')
      // stream.destroy()
      console.timeEnd(label)
      return resolve(data)
    })
    // stream.on('data', data => {
    //
    // })
    // stream.on('close', () => {
    //   console.timeEnd(label)
    // })
  })
}
