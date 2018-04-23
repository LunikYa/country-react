const addCountries = data => ({
    type: 'ADD_COUNTRIES',
    data
})

const createUser = path => ({
    type: 'CREATE_USER',
    user: path
})
export { addCountries, createUser}