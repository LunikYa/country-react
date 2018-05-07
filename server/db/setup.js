module.exports.initial = async () => {
    const db = require('./db').getDB();
    const fs = require('fs');
    
    const file = JSON.parse(fs.readFileSync('./data/countries.min.json', 'utf8'));

    const countries = db.collection('countries');
    const cities    = db.collection('cities');
    const users     = db.collection('users');

    const fileKeys = Object.keys(file)

    for(let i = 0; i < fileKeys.length; i++){
        const cursor = await countries.insertOne({ name: fileKeys[i] })
        
        for (let i = 0; i < file[fileKeys[i]].length; i++) {
            await cities.insertOne({
                name: file[fileKeys[i]][i],
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
