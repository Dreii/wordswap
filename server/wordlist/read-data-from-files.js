const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);

module.exports = () => readdir(__dirname+'/new-lists').then(files => files.forEach((file)=>readChunks(file)))

async function readChunks (file) {
  return new Promise(resolve => {
    let header
    const label = `read2-${file}`
    console.time(label)
    const stream = fs.createReadStream(__dirname+'/new-lists/'+file, {encoding: 'utf8'})
    stream.on('data', data => {
      return data;
      stream.destroy()
    })
    stream.on('close', () => {
      console.timeEnd(label)
      resolve()
    })
  })
}
