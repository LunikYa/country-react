const jwtsecret = "countries-react-key";
const jwt = require('jsonwebtoken');

let users =
    [
        { email: 'vasya@com.ua', password: '123456', surname: 'testuser', name: 'vasya', id: 1 },
        { email: 'petya@com.ua', password: '123456', surname: 'testuser', name: 'petya', id: 2 },
        { email: 'masha@com.ua', password: '123456', surname: 'testuser', name: 'masha', id: 3 }
    ]

module.exports.getUsers = async function  (ctx, next) {
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

module.exports.getUser = async function (ctx, next) {
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

module.exports.addNewUser = async function (ctx, next){
    let tempUser = ctx.request.body ,
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
            email: tempUser.email
        }
        const token = jwt.sign(payload, jwtsecret);

        ctx.response.body = { status: '200 OK', message: 'user created', token: token };
        await next();
    }    
}

module.exports.loginUser = async function (ctx, next){
    let tempUser = ctx.request.body,
        error = true;

    for(let i = 0; i < users.length; i++){
        if(users[i].email == tempUser.email && users[i].password == tempUser.password){
            error = false

            const payload = {
                id: tempUser.id,
                email: tempUser.email
            }
            const token = jwt.sign(payload, jwtsecret)

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
