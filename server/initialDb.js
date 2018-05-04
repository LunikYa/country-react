
module.exports.initial = () => {
    const db   = require('./db').getDB()
    const fs   = require('fs');
    const file = JSON.parse(fs.readFileSync('./countries.min.json', 'utf8'));

    const countries = db.collection('countries');
    const cities    = db.collection('cities');
    const fullWorld = db.collection('fullWorld');

    const { ObjectId } = require('mongodb');
    console.log(ObjectId(123))


    for (let {key, i} in file) {
        countries.insertOne({
            name: key,
            _id: ObjectId(i)
        })

        for(let j = 0; j < file[key].length; j++){
            cities.insertOne({
                _id: ObjectId(j),
                name: file[key][j],
                countryID: 
            })
        }

    }
    // let cities = [...file[countries[0]], ...file[countries[1]]];
  
    // countries.insertMany(countries.map((x, i)=>{
    //     return {
    //         name: x,
    //         id: i
    //     }
    // }))

    
    // cities.insertMany(cities.map((x, i) => {
    //     return {
    //         name: x, 
    //         id: i, 
    //     }
    // }))

   
    // cities.insertMany(cities.map((x, i) => {
    //     return {
    //         name: x,
    //         id: i,
    //     }
    // }))

    
    // const users = db.collection('users');
    // users.insertMany([
    //     {
    //         email: 'vasya@com.ua',
    //         name: 'vasya',
    //         surname: 'Alex',
    //         password: '123456'
    //     },
    //     {
    //         email: 'masha@com.ua',
    //         name: 'masha',
    //         surname: 'masha',
    //         password: '123456'
    //     }
    // ])
}
