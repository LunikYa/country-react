
module.exports.initial = ()=>{
    const db = require('./db').getDB()
    const fs   = require('fs');
    const file = JSON.parse(fs.readFileSync('./countries.min.json', 'utf8'));

    let countries = [];
    for (let key in file) {
        countries.push(key)
    }
    let cities = [...file[countries[0]], ...file[countries[1]]];

    const data = db.collection('data');
    data.insertMany([
        { 
            cities: cities,
            id: 'cities'
        },
        { 
            countries: countries,
            id: 'countries'
        },
        { 
            all: file,
            id: 'all'
        }
    ])

    const users = db.collection('users');
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
