import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Form extends Component {
    constructor(props){
        super(props);
    }

    validateForm = (event) => {        
        let result,
            form   = event.target;

        for (let i = 0; i < form.length; i++) {
            if (form[i].tagName === 'INPUT'){
                result = this.validateInput(form[i]);
            }
        }

        (result) ? this.props.submitForm(form) : event.preventDefault();
    }

    validateInput = (input) => {
         if (input.type === 'email') {
            if (!this.isValidemail(input)) {
                return false
            }
        } else if (input.type === 'password') {
            if (!this.isValidpassword(input)) {
                return false
            }
        } else if (input.type === 'text') {
            if (!this.isValidtext(input)) {
                return false
            }
        }
        return true
    }

    isValidemail(input) {
        let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try {
            if (!regExpEmail.test(input.value)) {
                throw ({ message: '*Email is not valid', elem: input })
            }
            input.style.border = '1px solid green';
            input.nextElementSibling.style.display = 'none';
            return true
        } catch (error) {
            this.showError(error, input)
            return false
        }
    }

    isValidpassword(input) {
        try {
            if (/\W/.test(input.value)) {
                throw ({ message: '*Password can`t include special character', elem: input })
            }
            else if (input.value.length < 6) {
                throw ({ message: '*Password must be 6 or more characters', elem: input })
            }
            input.style.border = '1px solid green';
            input.nextElementSibling.style.display = 'none';
            return true
        } catch (error) {
            this.showError(error, input)
            return false
        } 
    }

    isValidtext(input) {
        try {
            if (/\W|\d/.test(input.value[0])) {
                throw ({ message: '*First char must be letter', elem: input })
            }
            else if (input.value.length < 3) {
                throw ({ message: '*This field must be 3 or more characters', elem: input })
            }
            input.style.border = '1px solid green';
            input.nextElementSibling.style.display = 'none';
            return true
        } catch (error) {
            this.showError(error, input)
            return false
        }
    }

    showError = (error, input) => {
        input.style.border = '1px solid red'
        let errorBox = input.nextElementSibling;
            errorBox.style.display = 'block';
            errorBox.textContent = error.message;        
    }

    hideStatus = (elem) => {
        elem.style.border = '1px solid black';
        elem.nextElementSibling.style.display = 'none';
    }

    render() {
        const { submitForm } = this.props;
        return (
            <form name={this.props.options.name} noValidate method='post' onSubmit={(e) => { this.validateForm(e)}}>
                    {this.props.options.inputs.map((x) => {
                    return  <div>
                                <input type={x.type} 
                                       name={x.name} 
                                       placeholder={x.placeholder} 
                                       className='default-input' 
                                       onBlur={ (e) => this.validateInput(e.target) } 
                                       onFocus={ (e) => this.hideStatus(e.target) }/>
                                <div className='errormsg'>Error</div>
                            </div>
                    })}
                <button className='button'>Submit</button>
                </form>
        )
    }
}

export default Form