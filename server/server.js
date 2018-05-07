const Koa        = require('koa');
const bodyParser = require('koa-bodyparser');
const rootRouter = require('./router/router.js'); 
const mongoCl    = require('./db');
const app        = new Koa();
const hostname   = '127.0.0.1';
const port       = '3000';

async function server() {
    await mongoCl.connect();
   
    app.use(bodyParser());     
    
    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        await next();
    })
    
    app.use(rootRouter.routes())
    
    app.on('error', (err, ctx) => {
        console.log('server error', err, ctx)
    });

    app.listen(port, hostname, (e) => {
        if (e)
            console.log(e)
        console.log(`listen at http://${hostname}:${port}`)
    });
}

server()
