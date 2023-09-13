// Build a server with Node's HTTP module
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const http = require('http')
// import http from 'http'
const PORT = 3001
const server = http.createServer((req, res) => {
  console.log('server request')
  console.log(req.url, req.method)

  res.setHeader('Content-Type', 'application/json')

  const data = JSON.stringify(require('./server/food_base.json'))
  //   console.log();

  res.end(data)
})
// Start the server
server.listen(PORT, 'localhost', error => {
  if (error) return console.log(`Error: ${error}`)
  console.log(`Server is listening on port ${PORT}`)
})
