const fs = require('fs');
const jwt = require('jsonwebtoken');
const clientDb = require('../../db');

module.exports.getCountries = async function (ctx){
    const db                = clientDb.getDB();
    const collectionCountry = await db.collection('allDatacountries');
    const resultData        = await collectionCountry.findOne();
   
    let countries = [];

    for (let key in resultData) {
        countries.push(key);
    }

    const cursor = await db.collection('allCountries').insertOne({ countries: countries});
    
    ctx.response.status = 200;
    ctx.response.body = cursor.ops[0].countries;
}

module.exports.getCities = async function (ctx){
    const db                = clientDb.getDB();
    const collectionCountry = await db.collection('allDatacountries');
    const resultData        = await collectionCountry.findOne();
    const cities            = [...resultData[ctx.params.country]];

    const test = await db.collection('cities').save({cities: cities, id: 1});

    ctx.response.status = 200;
    ctx.response.body = cities;
}

module.exports.getFiltredCountries = async function (ctx){
    const db = clientDb.getDB();
    const collection = await db.collection('allCountries');
    const cursor = await collection.findOne();
    const val = ctx.params.val;
    const countries = cursor.countries;

    let filtredArr = (countries.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))

    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }

    ctx.response.status = 200;
    ctx.response.body = filtredArr;
}

module.exports.getFiltredCities = async function (ctx) {
    const db = clientDb.getDB();
    const collection = await db.collection('cities');
    const cursor = await collection.findOne();
    const cities = cursor.cities;
    const val = ctx.params.val;
    console.log(cursor)

    let filtredArr = (cities.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))

    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }

    ctx.response.status = 200;
    ctx.response.body = filtredArr;
}
