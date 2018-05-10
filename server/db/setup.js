module.exports = async () => {
    const db = require('./db').getDB();
    const fs = require('fs');
    
    const file = JSON.parse(fs.readFileSync('./data/countries.min.json', 'utf8'));

    const countries = db.collection('countries');
    const cities    = db.collection('cities');
    const users     = db.collection('users');

    const fileKeys = Object.keys(file)
        
    for (let key of fileKeys) {
        const cursor = await countries.insertOne({ name: key})
        
        for (let city of file[key]) {
            await cities.insertOne({
                name: city,
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
