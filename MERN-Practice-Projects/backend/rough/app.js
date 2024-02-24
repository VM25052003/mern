//Node module to launch servers basically
const http = require('http')
const fs = require('fs')

//Returns a new instance of server, taking request Listener as an argument, which is a function executing for every incoming request. This takes request and response object as argument, 
const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    res.setHeader('Content-type', 'text/html')
    if(url === '/'){
    res.write('<html>')
    res.write('<head><form action="/message" method="POST" type="text"><button type="submit">SEND</button></form></head>')
    res.write('</html>')
    return res.end()
    }
    if(url === '/message' && method === 'POST'){
        fs.writeFileSync('created.txt', 'DUMMY')
        return res.end()
    }
})

//listens to connection
server.listen(3000)