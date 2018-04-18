import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from './Input'

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        const { submitForm } = this.props;
        return (
                <form name={this.props.options.name} noValidate method='post' onSubmit = {(e)=>{ submitForm(e.target); e.preventDefault()}}>
                    {this.props.options.inputs.map((x) => {
                       return <Input options={x}/>
                    })}
                <button className='button'>Submit</button>
                </form>
        )
    }
}

export default Form