import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class City extends Component {
    render() {
        return (
            <div className='list'>
                <h2>City</h2>
                <ul className='list-general'>
                    {this.props.items.map((x) => {
                        return <a><li>{x}</li></a>
                    })}
                </ul>
            </div>
        )
    }
}

export default City;