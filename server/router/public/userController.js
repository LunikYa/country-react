const jwtsecret = "countries-react-key";
const jwt       = require('jsonwebtoken');
const clientDb  = require('../../db');

module.exports.regUser = async function (ctx){
    const db       = clientDb.getDB();
    const tempUser = ctx.request.body;
    const matches  = await db.collection('users').findOne({ email: tempUser.email });
   
    if (matches){   
        ctx.response.status  = 401;
        ctx.response.message = `Such email already exists - ${tempUser.email}`;
    } else {
        const doc     = await db.collection('users').insertOne(tempUser);
        const payload = {
            id: tempUser.id,
            email: tempUser.email
        }
        const token       = jwt.sign(payload, jwtsecret);
        ctx.response.body = { message: 'user created', token: token, user: doc.ops[0].email };
    }
}    

module.exports.loginUser = async function (ctx){
    const db       = clientDb.getDB();
    const tempUser = ctx.request.body;
    const match    = await db.collection('users').findOne(tempUser);

    if(match){
        const payload = {
            id: tempUser.id,
            email: tempUser.email
        }
        const token = jwt.sign(payload, jwtsecret)
        ctx.status  = 200;
        ctx.response.body = {
            email: match.email,
            id: match.id,
            name: match.name,
            surname: match.surname,
            token: token
        }
    } else {
        ctx.response.status  = 401;
        ctx.response.message = `User ${tempUser.email} not found`;
    }
}
