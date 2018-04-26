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
            this.response(req, res)
        })
        return server
    }

    use(func){
        this.middleweres.push(func)
    }

    get(func){
       this.response = func;
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

function middlewereFirst(req, res) {
    req.url = 'mYurl'
    return req
}

function middlewereSec(req, res) {
    req.body = {something: 'some body'}
    return req
}

function middlewereBred(req, res) {
    req.ok = true
    return req
}

function middlewereThird(req, res) {
    req.bred = true
    return req
}

const server = new App();

server.use(middlewereFirst)
server.use(middlewereSec)
server.use(middlewereThird)
server.use(middlewereBred)

server.get( function (req, res) {
    let response = `all ok ${req.url} ${req.body.something}  ${req.ok} ${req.bred}`
    res.end(response)
})

server.start(port)
