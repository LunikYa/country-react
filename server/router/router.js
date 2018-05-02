const Router = require('koa-router');
const router = Router(); 

const publicRout = require('./public/routers');
const securityRout = require('./security/routers');

router.use(publicRout.routes())
      .use(publicRout.allowedMethods())
      .use(securityRout.routes())
      .use(securityRout.allowedMethods())

module.exports = router;