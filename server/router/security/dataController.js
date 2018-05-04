const jwt = require('jsonwebtoken');
const clientDb = require('../../db');

module.exports.getCountries = async function (ctx){
    const db                = clientDb.getDB();
    const collectionCountry = await db.collection('countries_cities');
    const resultData        = await collectionCountry.findOne();
   
    let countries = [];

    for (let key in resultData) {
        if(key !== '_id')
            countries.push(key);
    }

    const cursor = await db.collection('countries').insertOne({ countries: countries});
    
    ctx.response.status = 200;
    ctx.response.body   = cursor.ops[0].countries;
}

module.exports.getCities = async function (ctx){
    const db                = clientDb.getDB();
    const collectionCountry = await db.collection('countries_cities');
    const resultData        = await collectionCountry.findOne();
    const cities            = [...resultData[ctx.params.country]];

    const test = await db.collection('cities').save({cities: cities, id: 1});

    ctx.response.status = 200;
    ctx.response.body   = cities;
}

module.exports.getFiltredCountries = async function (ctx){
    const db         = clientDb.getDB();
    const collection = await db.collection('countries');
    const cursor     = await collection.findOne();
    const val        = ctx.params.val;
    const countries  = cursor.countries;
    
    if(val == 'all'){
        ctx.response.status = 200;
        ctx.response.body   = countries;
    } else {
        let filtredArr = (countries.filter((a) => {
            return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
        }))

        if (filtredArr.length === 0) {
            filtredArr.push('No matches');
        }
        ctx.response.status = 200;
        ctx.response.body   = filtredArr;
    }    
}

module.exports.getFiltredCities = async function (ctx) {
    const db         = clientDb.getDB();
    const collection = await db.collection('cities');
    const cursor     = await collection.findOne();
    const cities     = cursor.cities;
    const val        = ctx.params.val;

    if(val == 'all'){
        ctx.response.status = 200;
        ctx.response.body   = cities;
    } else{
        let filtredArr = (cities.filter((a) => {
            return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
        }))

        if (filtredArr.length === 0) {
            filtredArr.push('No matches');
        }
        
        ctx.response.status = 200;
        ctx.response.body   = filtredArr;
    }
    
}
