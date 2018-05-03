const jwtsecret = "countries-react-key";
const jwt = require('jsonwebtoken');
const clientDb = require('../../db');

module.exports.regUser = async function (ctx, next){
    let db = clientDb.getDB(),
        tempUser = ctx.request.body;
    
        console.log('start')
        const matches = await db.collection('users').findOne({ email: tempUser.email }).then(resolve=>{return resolve});
        console.log('get matches')
    
    if (matches){
        console.log('wrong email == email', matches)
    
        ctx.response.status = 401;
        ctx.response.message = 'Such email already exists';
        ctx.response.body = 'dont create';
    } else {
        let doc = await db.collection('users').insertOne(tempUser);
        console.log('user created', doc.ops)
        
        const payload = {
            id: tempUser.id,
            email: tempUser.email
        }

        const token = jwt.sign(payload, jwtsecret);
        ctx.response.body = { message: 'user created', token: token, doc: doc.ops };
    }
    console.log('finished')
}    

module.exports.loginUser = async function (ctx, next){
    let db = clientDb.getDB(),
        tempUser = ctx.request.body;

    const match = await db.collection('users').findOne(tempUser);

    console.log(match)
    
    if(match){
        const payload = {
            id: tempUser.id,
            email: tempUser.email
        }
        const token = jwt.sign(payload, jwtsecret)

        ctx.response.body = {
            email: match.email,
            id: match.id,
            name: match.name,
            surname: match.surname,
            token: token
        }
    } else {
        ctx.response.status = 401;
        ctx.response.message = 'Unauthorized';
    }
}
