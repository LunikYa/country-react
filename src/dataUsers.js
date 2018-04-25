let users = 
    [
        { email: 'vasya@com.ua', password: '123456', surname: 'testuser', name: 'vasya' },
        { email: 'petya@com.ua', password: '123456', surname: 'testuser', name: 'petya' },
        { email: 'masha@com.ua', password: '123456', surname: 'testuser', name: 'masha' }
    ]

function getUser(user){
    for (let i = 0; i < users.length; i++) {
        if ((user.email === users[i].email) && (user.password === users[i].password)) {
            return {
                email: users[i].email,
                surname: users[i].surname,
                name: users[i].name
            }
        }
    }
    return false
}

export default getUser