// Build a server with Node's HTTP module
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const http = require('http')
// import http from 'http'

const PORT = 3001

const server = http.createServer((req, res) => {
  const time = new Date()
  console.log(
    `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  )
  console.log(req.url)
  console.log(req.method)
  console.log('------------')

  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const data = JSON.stringify(require('./server/food_base.json'))

  res.end(data)
})
// Start the server
server.listen(PORT, 'localhost', error => {
  if (error) return console.log(`Error: ${error}`)
  console.log(`Server is listening on port ${PORT}`)
})
