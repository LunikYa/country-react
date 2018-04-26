const http = require('http');
const port = 3000;

class App {
    constructor(){
        this.middleweres = [];
    }
    init(){
        const server = http.createServer(async (req, res) => {
            for (let i = 0; i < this.middleweres.length; i++){
                await this.middleweres[i](req, res)
            }
            let response = `all ok ${req.url} ${req.body.something}  ${req.ok} ${req.bred}`
            res.end(response)
        })
        return server
    }

    use(func){
        this.middleweres.push(func)
    }
    start(port){
       this.init().listen(port, (e)=>{
            if(e){
               console.log('Errrorr', e)
            }
           console.log(`Server running at http://localhost:${port}/`)
       })
    }
}

function middlewereFirst(req) {
    req.url = 'mYurl'
    return true
}

function middlewereSec(req) {
    req.body = {something: 'some body'}
    return true
}

function middlewereBred(req) {
    req.ok = true
    return true
}

function middlewereThird(req) {
    req.bred = true
    return true
}

const server = new App();

server.use(middlewereFirst)
server.use(middlewereSec)
server.use(middlewereThird)
server.use(middlewereBred)

server.start(port)
