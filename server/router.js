const Router = require('koa-router');
const router = Router(); 
const { getUsers, getUser, addNewUser, loginUser} = require('./userController');
const {verifyToken }= require('./varifyToken')

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users/:name', addNewUser);
router.post('/login', loginUser);

router.use('/users', verifyToken);

module.exports = router;