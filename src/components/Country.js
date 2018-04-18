import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Country extends Component {
    render() {
        const { choosed } = this.props;
        return (
            <div className='list'>
                <h2>Country</h2>
                <ul className='list-general' onClick={(e) => choosed(e.target.textContent)}>
                    {this.props.items.map((x)=>{
                       return <a><li>{x}</li></a> 
                    })}
                </ul>
            </div>
        )
    }
}

export default Country;