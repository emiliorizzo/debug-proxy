const express = require('express')
const proxy = require('http-proxy-middleware')

// target
const target = 'http://localhost:4444'
// proxy
const address = 'localhost'
const port = '8999'

const app = express()


const onProxyReq = (proxyReq, req, res) => {
  if (req.body) {
    console.log(req.body)
    const bodyData = JSON.stringify(req.body)
    proxyReq.setHeader('Content-Type', 'application/json')
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
    proxyReq.write(bodyData)
  }
}

app.use(express.json())
app.use('/', proxy({ target, changeOrigin: false, onProxyReq }))

app.listen(port, address)

