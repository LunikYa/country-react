const Router = require('koa-router');
const router = Router();
const { regUser, loginUser } = require('./userController');

router.post('/register', regUser);
router.post('/login', loginUser);

module.exports = router;