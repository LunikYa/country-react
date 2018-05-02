// const MongoClient = require('mongodb').MongoClient;
// const mongoUrl = "mongodb://localhost:27017/";

// var db;
    
// MongoClient.connect(mongoUrl, (err, client) => {
//     if (err) { console.log(err) }

//     db = client;
//     // console.log(db)
//     // client.close();

//     // let db = client.db('mongoCountry');
//     // app.users = db.collection('users')
//     // console.log(app.users )
//     // // app.countries = client.collection('countries')
//     // console.log("Database connection established")
// })

    
// console.log('config db', db)
//     module.exports = db;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let db;

(async function () {
    // Connection URL
    const url = 'mongodb://localhost:27017/myproject';
    // Database Name
    const dbName = 'myproject';
    let client;

    try {
        // Use connect method to connect to the Server
        client = await MongoClient.connect(url);

        db = {...client.db('mybd')};
        // console.log(client.db('mybd'))
    } catch (err) {
        console.log(err.stack);
    }

    if (client) {
        client.close();
    }
})();

console.log('test', db)