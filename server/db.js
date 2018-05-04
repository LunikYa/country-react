const MongoClient = require('mongodb').MongoClient;
const mongoUrl    = "mongodb://localhost:27017/";

var db;

module.exports.connect = async function () {
    await MongoClient.connect(mongoUrl, (err, client) => {
        if (err) console.log(err)
        db = client.db('country-react');
    });
}

module.exports.getDB = function () {
    return db;
}
