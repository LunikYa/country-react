const MongoClient = require('mongodb').MongoClient;
const mongoUrl    = "mongodb://localhost:27017/";

var db;

module.exports.connect = async function () {
    await MongoClient.connect(mongoUrl, async (err, client) => {
        if (err) console.log(err)
        db = await client.db('country-react');
        
    const stats = db.stats();
        if(!stats.collections < 1)
            await require('./initialDb').initial();
    });
}

module.exports.getDB = function () {
   return db
}
