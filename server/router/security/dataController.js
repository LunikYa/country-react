const clientDb     = require('../../db');
const { ObjectId } = require('mongodb');

module.exports.getCountries = async function (ctx) {
    const db = clientDb.getDB();

    const countries = await db.collection('countries').find().toArray();

    ctx.response.status = 200;
    ctx.response.body = countries;
}

module.exports.getCities = async function (ctx) {
    const db = clientDb.getDB();

    const cities = await db.collection('cities').find({ countryId: ObjectId(ctx.params.countryId) }).toArray();

    ctx.response.status = 200;
    ctx.response.body = cities;
}

module.exports.getFiltredCountries = async function (ctx){
    const db  = clientDb.getDB();
    const reg = new RegExp(`^${ctx.params.val}`);

    const matches  = await db.collection('countries').find({ name: { $regex: reg }}).toArray();

    ctx.response.status = 200;
    ctx.response.body   = matches;
}

module.exports.getFiltredCities = async function (ctx) {
    const db   = clientDb.getDB();
    const reg  = new RegExp(`^${ctx.params.val}`);

    const matches = await db.collection('cities').find(
        { 
            name: { $regex: reg }, 
            countryId: ObjectId(ctx.params.countryId)
        }
    ).toArray();
    
    ctx.response.status = 200;
    ctx.response.body = matches;
}
