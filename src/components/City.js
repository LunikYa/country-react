import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { getCountryByCity} from '../store/actions/countriesActions'

class City extends Component {
    render() {
        return (
            <div className='list'>
                <h2>City</h2>
                <ul className='list-general'>
                    {this.props.cities.map((city, i) => {
                        return <a key={i} onClick={()=>this.props.choosed(city.countryId)}><li>{city.name}</li></a>
                    })}
                </ul>
            </div>
        )        
    }
}

function mapStateToProps(state) {
    return {
        cities: state.citiesState.cities,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        choosed: (city) => { dispatch(getCountryByCity(city)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(City)
