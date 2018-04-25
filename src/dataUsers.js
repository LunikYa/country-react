let users = 
    [
        { email: 'vasya@com.ua', password: '123456', surname: 'testuser', name: 'vasya' },
        { email: 'petya@com.ua', password: '123456', surname: 'testuser', name: 'petya' },
        { email: 'masha@com.ua', password: '123456', surname: 'testuser', name: 'masha' }
    ]

function getUser(user){
    let tempUser = {};

    for (let i = 0; i < users.length; i++) {
        if (user.email === users[i].email) {
            tempUser = { ...users[i] }
        }
    }

    if (!tempUser.email) {
        return {
            error: 'email'
        }
    } else if (tempUser.password !== user.password) {
        return {
            error: 'password'
        }
    } else {
        return tempUser
    }   
}

export default getUser