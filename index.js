const WebSocket = require('ws')

const wss = new WebSocket.Server({port:8080})

wss.on('connection', (ws, req) => {
    let ip = req.connection.remoteAddress
    console.log('remote address', ip)
    // console.log('remote address', req.headers['x-forward-for'])
    ws.on('message', (msg)=>{
        console.log(new Date + ip + ' say to you:' + msg)
    })
    ws.on('close', (code, msg) =>{
        console.log(ip + ' has left', code, msg)
    })
})

wss.on('headers', (data) => {
    console.log('headers', data)
})

wss.on('error', (err) => {
    console.log(new Date, err)
})