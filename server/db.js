const MongoClient = require('mongodb').MongoClient;
const mongoUrl    = "mongodb://localhost:27017/";

var db;

module.exports.connect = function () {
    MongoClient.connect(mongoUrl, async (err, client) => {
        if (err) console.log(err)
        db = await client.db('country-react');

        const stats = await db.stats();

        if(!stats.indexes)
            require('./initialDb').initial();
    });
}

module.exports.getDB = function () {
   return db
}
