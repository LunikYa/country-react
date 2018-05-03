const Router = require('koa-router');
const router = Router(); 
const publicRout = require('./public/publicRouters');
const securityRout = require('./security/securityRouters');
const { verifyToken } = require('./verifyToken');

router
      .use(publicRout.routes())
      .use(publicRout.allowedMethods())
// .use(verifyToken)
      .use(securityRout.routes())
      .use(securityRout.allowedMethods())

module.exports = router;