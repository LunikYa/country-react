import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { chooseCountry, getCities} from '../store/actions/countriesActions';

class Country extends Component {
    choosed = (country) => {
        this.props.dispatch(chooseCountry(country));
        this.props.dispatch(getCities(country._id, localStorage.getItem('token')))
    }

    render() {
        return (
            <div className='list'>
                <h2>Country</h2>
                <ul className='list-general'>
                    {this.props.countries.map((country, i)=>{                        
                        return  <a onClick={() => this.choosed(country)} key={i}>
                                    <li>{country.name}</li>
                                </a>
                    })}
                </ul>
            </div>
        )
    }
}

function map(state) {
    return {
        countries: state.countriesState.countries,
    }
}
export default connect(map)(Country);