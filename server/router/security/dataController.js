const jwt      = require('jsonwebtoken');
const clientDb = require('../../db');

module.exports.getCountries = async function (ctx){
    const db                = clientDb.getDB();
    const resultData        = await db.collection('countries').findOne();

    ctx.response.status = 200;
    ctx.response.body   = resultData.countries;
}

module.exports.getCities = async function (ctx){
    const db                = clientDb.getDB();
    const resultData        = await db.collection('countries_cities').findOne();
    const cities            = [...resultData[ctx.params.country]];

    const test = await db.collection('cities').save({cities: cities, id: 1});

    ctx.response.status = 200;
    ctx.response.body   = cities;
}

module.exports.getFiltredCountries = async function (ctx){
    const db         = clientDb.getDB();
    const cursor     = await db.collection('countries').findOne();
    const val        = ctx.params.val;
    const countries  = cursor.countries;
    
    let filtredArr = (countries.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))

    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }
    ctx.response.status = 200;
    ctx.response.body   = filtredArr;
    }    


module.exports.getFiltredCities = async function (ctx) {
    const db         = clientDb.getDB();
    const cursor     = await db.collection('cities').findOne();
    const cities     = cursor.cities;
    const val        = ctx.params.val;

    let filtredArr = (cities.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))

    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }
    
    ctx.response.status = 200;
    ctx.response.body   = filtredArr;
}
