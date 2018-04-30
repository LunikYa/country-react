const Koa = require('koa');
const bodyParser = require('koa-body');
const users = require('./users.js');

const app = new Koa();
const hostname = '127.0.0.1';
const port = '3000';

app.use(bodyParser({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true,
}));

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
})

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});

app.use(users.routes());

app.listen(port, hostname, (e)=>{
    if(e)
        console.log(e)
    console.log(`listen at http://${hostname}:${port}`)
});
