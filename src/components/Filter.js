import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Filter extends Component {
    render() {
        const { filter } = this.props;
        return (
            <div>
                <input type="text" placeholder='Filter' className='filter-input' onInput={(e) => { filter(e.target.value)}}/>
            </div>
        )
    }
}

export default Filter;