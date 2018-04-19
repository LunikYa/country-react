import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Country extends Component {
    render() {
        const { choosed } = this.props;
        return (
            <div className='list'>
                <h2>Country</h2>
                <ul className='list-general'>
                    {this.props.countries.map((country, idx)=>{
                        return <a onClick={() => choosed(country)} key={idx}><li>{country}</li></a>
                    })}
                </ul>
            </div>
        )
    }
}

export default Country;