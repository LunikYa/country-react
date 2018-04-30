const Router = require('koa-router');
const router = Router(); 

const jwtsecret = "countries-react-key";
const jwt = require('jsonwebtoken');

let users =
    [
        { email: 'vasya@com.ua', password: '123456', surname: 'testuser', name: 'vasya', id: 1 },
        { email: 'petya@com.ua', password: '123456', surname: 'testuser', name: 'petya', id: 2 },
        { email: 'masha@com.ua', password: '123456', surname: 'testuser', name: 'masha', id: 3 }
    ]

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users/:login', addNewUser);
router.post('/login', loginUser);

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
    
    for(let i = 0; i < users.length; i++){
        if(users[i].id == ctx.params.id){
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
    let tempUser = JSON.parse(ctx.request.body),
        error = false;

    for(let i = 0; i < users.length; i++){
        if(tempUser.email == users[i].email){
            error = true;
            ctx.response.status = 401;
            ctx.response.message = 'Such email already exists';
        }
    }

    if (!error) {
        users.push({ ...tempUser, id: users.length + 1 })

        const payload = {
            id: tempUser.id,
            name: tempUser.name,
            surname: tempUser.surname,
            email: tempUser.email
        }
      
        const token = jwt.sign(payload, jwtsecret)
        console.log(token)
        
        ctx.response.body = { status: '200 OK', message: 'user created' };
        await next();
    }    
}

async function loginUser(ctx, next){
    let tempUser = JSON.parse(ctx.request.body),
        error = true;
   
    for(let i = 0; i < users.length; i++){
        if(users[i].email == tempUser.email && users[i].password == tempUser.password){
            error = false

            const payload = {
                id: tempUser.id,
                name: tempUser.name,
                surname: tempUser.surname,
                email: tempUser.email
            }

            const token = jwt.sign(payload, jwtsecret)
            console.log(token)
            
            ctx.response.body = {
                email: users[i].email,
                id: users[i].id,
                name: users[i].name,
                surname: users[i].surname,
                token: token
            }
            break
        }
    } if(error){
        ctx.response.status = 401;
        ctx.response.message = 'Unauthorized';
    }
    await next();
}

module.exports = router;