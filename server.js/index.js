const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req, res)
    res.end('My server');
});

server.listen(port, (err)=>{
    if(err){
        console.log('wrong', err)
    }
    console.log(`Server running at http://localhost:${port}/`);
});
