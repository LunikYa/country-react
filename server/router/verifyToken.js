const jwt = require('jsonwebtoken');

module.exports.verifyToken = async function (ctx, next) {
    const token = ctx.request.header['authorization'];
    let isUser = false;

    if (!token){
        ctx.response.status = 403;
        ctx.response.body   = { auth: false, message: 'No token provided.' };
    } else {
        jwt.verify(token, "countries-react-key", (err, decoded) => {
            if (err) {
                ctx.response.status = 404;
                ctx.response.body = { auth: false, message: 'Failed to authenticate token.' };
            } else {
                ctx.request.user = decoded;
                isUser = true;
            }           
        });
        if (isUser)
            await next()
    }
    
}