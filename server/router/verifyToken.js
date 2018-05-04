const jwt = require('jsonwebtoken');

module.exports.verifyToken = function (ctx, next) {
    const token = ctx.request.headers['x-access-token'];
    
    if (!token){
        ctx.response.status = 403;
        ctx.response.body   = { auth: false, message: 'No token provided.' };
    }
    jwt.verify(token, "countries-react-key", (err, decoded) => {
        if (err) {
            ctx.response.status = 404;
            ctx.response.body   = { auth: false, message: 'Failed to authenticate token.' };
        }
        ctx.request.user = decoded;
    });
}