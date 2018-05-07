const MongoClient = require('mongodb').MongoClient;
const mongoUrl    = "mongodb://localhost:27017/";

var db;

module.exports.connect = () => {
    return new Promise((res, rej) => {
        MongoClient.connect(mongoUrl, (err, client) => 
        {
            if (err) console.log(err);
            
            db = client.db('country-react');
            res(db)
        });
    })
}

module.exports.getDB = function () {
   return db
}
