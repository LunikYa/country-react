const Router = require('koa-router');
const router = Router(); 

const publicRout = require('./public/routs');
const securityRout = require('./security/routs');

router.use(publicRout.routes())
      .use(publicRout.allowedMethods())
      .use(securityRout.routes())
      .use(securityRout.allowedMethods())

module.exports = router;