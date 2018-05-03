const fs = require('fs');
const jwt = require('jsonwebtoken');
const fileFullDataCountries = './router/security/data/allDataCountries.min.json';
const fileCountryList = './router/security/data/countryList.json';
const fileCityList = './router/security/data/cityList.json';


module.exports.getCountries = function (ctx){
    // console.log('server', db)
    // db.collection('countries')
    let fullData = JSON.parse(fs.readFileSync(fileFullDataCountries, 'utf8'));
    let countries = [];

    for (let key in fullData) {
        countries.push(key);
    }
    fs.writeFileSync(fileCountryList, JSON.stringify(countries));

    ctx.response.status = 200;
    ctx.response.body = countries;
}

module.exports.getCities = function (ctx){
    let fullData = JSON.parse(fs.readFileSync(fileFullDataCountries, 'utf8'));
    
    let cities = [...fullData[ctx.params.country]];
    fs.writeFileSync(fileCityList, JSON.stringify(cities))
    
    ctx.response.status = 200;
    ctx.response.body = cities;
}

module.exports.getFiltredCountries = function (ctx){
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
}

module.exports.getFiltredCities = function (ctx) {
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
}
