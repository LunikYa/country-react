const jwt      = require('jsonwebtoken');
const clientDb = require('../../db');

module.exports.getCountries = async function (ctx){
    const db                = clientDb.getDB();
    const resultData        = await db.collection('data').findOne({id: 'countries'});

    ctx.response.status = 200;
    ctx.response.body   = resultData.countries;
}

module.exports.getCities = async function (ctx){
    const db      = clientDb.getDB();
    const allDoc  = await db.collection('data').findOne({ id: 'all' });
    const cities = allDoc.all[ctx.params.country];

    const test = await db.collection('data').save({cities: cities, id: 'cities'});

    ctx.response.status = 200;
    ctx.response.body   = cities;
}

module.exports.getFiltredCountries = async function (ctx){
    const db   = clientDb.getDB();
    const val  = ctx.params.val;
    const res  = await db.collection('data').findOne({id: 'countries'});
    
    let filtredArr = (res.countries.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))

    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }
    ctx.response.status = 200;
    ctx.response.body   = filtredArr;
    }    


module.exports.getFiltredCities = async function (ctx) {
    const db   = clientDb.getDB();
    const res  = await db.collection('data').findOne({ id: 'cities' });
    const val  = ctx.params.val;

    let filtredArr = (res.cities.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))

    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }
    
    ctx.response.status = 200;
    ctx.response.body   = filtredArr;
}
