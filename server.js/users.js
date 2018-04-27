const Router = require('koa-router');
const router = Router(); 

let users =
    [
        { email: 'vasya@com.ua', password: '123456', surname: 'testuser', name: 'vasya', id: 1 },
        { email: 'petya@com.ua', password: '123456', surname: 'testuser', name: 'petya', id: 2 },
        { email: 'masha@com.ua', password: '123456', surname: 'testuser', name: 'masha', id: 3 }
    ]

router.get('/users', getUsers);
// router.get('/users/:email/:pass', getUser);
router.get('/users/:id', getUser);
router.post('/users', addNewUser);

async function getUsers (ctx, next) {
    let tempUsers = users.map((x) => {
        return {
            email: x.email,
            surname: x.surname,
            name: x.name,
            id: x.id
        }
    })
    ctx.body = tempUsers;
    await next();
}

async function getUser(ctx, next) {
    let user;
    console.log(ctx.params)
    for(let i = 0; i < users.length; i++){
        if(users[i].id == ctx.params.id){
        // if((users[i].email == ctx.params.email) && (users[i].password == ctx.params.pass)){
            user = users[i];
            ctx.response.body = {
                email: user.email,
                surname: user.surname,
                name: user.name,
                id: user.id
            };
        }
    } if(!user){
        ctx.response.status = 204;
        ctx.response.message = 'No Content';
    }
    await next();
}

async function addNewUser(ctx, next){
    let tempUser = JSON.parse(ctx.request.body);
    users.push({ ...tempUser, id: users.length+1})
    ctx.response.body = {status:'200 OK', message: 'user created'};
    await next()
}
module.exports = router;