import React, { Component } from 'react';
import { connect }          from 'react-redux';

class City extends Component {
    render() {
        return (
            <div className='list'>
                <h2>City</h2>
                <ul className='list-general'>
                    {this.props.cities.map((city, i) => {
                        return <a key={i}><li>{city.name}</li></a>
                    })}
                </ul>
            </div>
        )
    }
}

function map(state) {
    return {
        cities: state.countriesState.cities,
    }
}
export default connect(map)(City)
