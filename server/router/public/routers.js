const Router = require('koa-router');
const router = Router();
const { regUser, loginUser } = require('./userModel');

router.post('/register', regUser);
router.post('/login', loginUser);

module.exports = router;