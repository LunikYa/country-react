import React, { Component } from 'react';
import { connect } from 'react-redux';
import { choosedCountry } from '../store/actions';

class Country extends Component {
    choosed = (country) => {
       this.props.dispatch(choosedCountry(country))
    }

    render() {
        return (
            <div className='list'>
                <h2>Country</h2>
                <ul className='list-general'>
                    {this.props.countries.map((country, i)=>{
                        return <a onClick={()=>this.choosed(country)} key={i}><li>{country}</li></a>
                    })}
                </ul>
            </div>
        )
    }
}

function map(state) {
    return {
        countries: state.countriesState.filtredCountries,
    }
}
export default connect(map)(Country);