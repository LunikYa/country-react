const Router = require('koa-router');
const router = Router(); 

const publicRout = require('./public/router');
const securityRout = require('./security/router');

router.use(publicRout.routes())
      .use(publicRout.allowedMethods())
      .use(securityRout.routes())
      .use(securityRout.allowedMethods())

module.exports = router;