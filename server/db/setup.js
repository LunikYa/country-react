module.exports.initial = async () => {
    const db = require('./db').getDB();
    const fs = require('fs');
    
    const file = JSON.parse(fs.readFileSync('./data/countries.min.json', 'utf8'));

    const countries = db.collection('countries');
    const cities    = db.collection('cities');
    const users     = db.collection('users');

    for (let key in file) {
        const cursor = await countries.insertOne({ name: key })
        
        for (let i = 0; i < file[key].length; i++){
            await cities.insertOne({
                name: file[key][i],
                countryId: cursor.ops[0]._id
            })
        }
    }

    users.insertMany([
        {
            email: 'vasya@com.ua',
            name: 'vasya',
            surname: 'Alex',
            password: '123456'
        },
        {
            email: 'masha@com.ua',
            name: 'masha',
            surname: 'masha',
            password: '123456'
        }
    ])
}
