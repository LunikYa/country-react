const MongoClient = require('mongodb').MongoClient;
const mongoUrl    = "mongodb://localhost:27017/";

var db;

module.exports.connect = function () {
    MongoClient.connect(mongoUrl, async (err, client) => {
        if (err) console.log(err)
            db = await client.db('country-react');
            
        let stats = await db.stats()
        if(!stats.collections < 1)
            require('./initialDb').initial();
    });
}

module.exports.getDB = function () {
    return db;
}
