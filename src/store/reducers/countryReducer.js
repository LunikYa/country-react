import * as types from '../constants';

let initialState = {
    countries: [],
    idCurrentCountry: '',
    countriesLoaded: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COUNTRIES_SUCCES:
            return { ...state, ...{ countries: action.payload, countriesLoaded: true, idCurrentCountry: action.payload[0]._id } }

        case types.FILTER_COUNTRY:
            return { ...state, ...{ countries: action.payload, idCurrentCountry: action.payload[0]._id } }

        case types.CHOOSE_COUNTRY:
            return { ...state, ...{ idCurrentCountry: action.payload} }

        case types.GET_COUNTRY_BY_CITY:
            return { ...state, ...{ countries: [action.payload] } }

        default:
            return state
    }
}
