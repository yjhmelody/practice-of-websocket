const WebSocket = require('ws')

const wss = new WebSocket.Server({port:8080})

let count = 0
wss.on('connection', (ws, req) => {
    let ip = req.connection.remoteAddress
    // console.log('remote address ' + ip)
    count++
    ws.nickname = 'user ' + count

    broadcast(ws.nickname + ' comes in')
    ws.on('message', (msg)=>{
        // console.log('Received' + msg)
        broadcast(msg)
    })
    ws.on('message', (msg)=>{
        // console.log(new Date + ip + ' say to you:' + msg)
    })
    ws.on('close', (code, msg) =>{
        console.log(ip + ' has left', code, msg)
        broadcast(ws.nickname + ' left')
    })
})

wss.on('headers', (data) => {
    // console.log('headers', data)
})

wss.on('error', (err) => {
    console.log(new Date, err)
})


function broadcast(msg){
    wss.clients.forEach(function(client){
        client.send(msg)
    })
}