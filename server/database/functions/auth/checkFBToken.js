let https = require('https')

module.exports = (token) => new Promise((resolve, reject) =>{
  let requestUrl = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${process.env.FBAPPID}|${process.env.FBAPPSECRET}`
  return https.get(requestUrl,
  (res)=>{
    const { statusCode } = res
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`)
    }

    if (error) {
      console.error(error.message)
      // consume response data to free up memory
      res.resume()
      reject(error)
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => { rawData += chunk; })
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData)
        return resolve(parsedData.data)
      } catch (e) {
        throw e
      }
    })
  }).on('error', (e) => {
    console.log('error', e)
    return reject(e)
  })
})
