const fs = require('fs');
const jwt = require('jsonwebtoken');
const fileFullDataCountries = './router/security/data/allDataCountries.min.json';
const fileCountryList = './router/security/data/countryList.json';
const fileCityList = './router/security/data/cityList.json';

module.exports.getCountries = async function (ctx, next){
    let fullData = JSON.parse(fs.readFileSync(fileFullDataCountries, 'utf8'));
    let countries = [];

    for (let key in fullData) {
        countries.push(key);
    }
    fs.writeFileSync(fileCountryList, JSON.stringify(countries));

    ctx.response.status = 200;
    ctx.response.body = countries;
    await next();
}

module.exports.getCities = async function (ctx, next){
    let fullData = JSON.parse(fs.readFileSync(fileFullDataCountries, 'utf8'));
    
    let cities = [...fullData[ctx.params.country]];
    fs.writeFileSync(fileCityList, JSON.stringify(cities))
    
    ctx.response.status = 200;
    ctx.response.body = cities;
    await next();
}

module.exports.getFiltredCountries = async function (ctx, next){
    let countries = JSON.parse(fs.readFileSync(fileCountryList, 'utf8')),
        val = ctx.params.val;
 
    let filtredArr = (countries.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))

    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }
    ctx.response.status = 200;
    ctx.response.body = filtredArr;

    await next()
}

module.exports.getFiltredCities = async function (ctx, next) {
    let cities = JSON.parse(fs.readFileSync(fileCityList, 'utf8')),
        val = ctx.params.val;

    let filtredArr = (cities.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))

    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }
    ctx.response.status = 200;
    ctx.response.body = filtredArr;
    await next()
}

module.exports.verifyToken = async function  (ctx, next) {
    const token = ctx.request.headers['x-access-token'];

    if (!token)
        ctx.response.status = 403;
    ctx.response.body = { auth: false, message: 'No token provided.' };

    jwt.verify(token, "countries-react-key", (err, decoded) => {
        if (err) {
            ctx.response.status = 404;
            ctx.response.body = { auth: false, message: 'Failed to authenticate token.' };
        }
        ctx.request.userId = decoded.id;
    });

    await next();
}