import React, { Component } from 'react';

class City extends Component {
    render() {
        return (
            <div className='list'>
                <h2>City</h2>
                <ul className='list-general'>
                    {this.props.cities.map((x, i) => {
                        return <a key={i}><li>{x}</li></a>
                    })}
                </ul>
            </div>
        )
    }
}

export default City;