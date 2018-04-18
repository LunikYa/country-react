import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Input extends Component {
    render(){
        return (
            <div>
                <input type = {this.props.options.type} 
                       name = {this.props.options.name} 
                       placeholder = {this.props.options.placeholder} 
                       className = 'default-input'/>
                <div className = 'errormsg'>Error</div>
            </div>
        )
    }
}

export default Input