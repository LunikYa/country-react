import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Register extends Component {
    state = {
        errorPass: '',
        errorEmail: '',
        errorName: '',
        errorSurname: ''
    }
    validateUser = (form) => {
        if ('vasya@com.ua' === form.email.value) {
            this.showError('*This email already exists', form.email)
            event.preventDefault()
        } else {
            this.createUser(form);
        }
    }

    validateForm = (event) => {
        let result = true,
            form = event.target;
        for (let i = 0; i < form.length; i++) {
            if (form[i].type === 'email') {
                if (!this.isValidemail(form[i])) {
                    result = false
                }
            } else if (form[i].type === 'password') {
                if (!this.isValidpassword(form[i])) {
                    result = false
                }
            } else if (form[i].type === 'text') {
                if (!this.isValidtext(form[i])) {
                    result = false
                }
            }
        }
        (result) ? this.validateUser(form) : event.preventDefault();
    }

    isValidemail = (input) => {
        let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regExpEmail.test(input.value)) {
                this.showError('*Email is not valid', input)
                return false
            } else {
                input.className = 'accept-input';
                this.setState({ errorEmail: '' });
                return true
            }
    }

    isValidpassword = (input) => {
        if (/\W/.test(input.value)) {
            this.showError('*Password can`t include special character', input)
            return false
        }
        else if (input.value.length < 6) {
            this.showError('*Password must be 6 or more characters', input)
            return false
        }
        input.className = 'accept-input';
        this.setState({ errorPassword: '' });
        return true
    }

    isValidtext = (input) => {
        if (/\W|\d/.test(input.value[0])) {
            this.showError('*First char must be letter', input)
            return false
        }
        else if (input.value.length < 3) {
            this.showError('*This field must be 3 or more characters', input)
            return false
        } else {
            input.className = 'accept-input';
            if(input.name === 'surname')
                this.setState({ errorSurname: '' });
            else if(input.name === 'name')
                this.setState({ errorName: '' });
            return true
        }        
    }
    
    showError = (error, input) => {
        input.className = 'error-input';

        if (input.name === 'email') {
            this.setState({ errorEmail: error });
        } else if (input.name === 'password') {
            this.setState({ errorPass: error });
        } else if (input.name === 'surname') {
            this.setState({ errorSurname: error });
        } else if (input.name === 'name') {
            this.setState({ errorName: error });
        }
    }

    hideStatus = (elem) => {
        elem.className = 'disable-input';

        if (elem.name === 'email') {
            this.setState({ errorEmail: '' });
        } else if (elem.name === 'password') {
            this.setState({ errorPass: '' });
        } else if (elem.name === 'surname') {
            this.setState({ errorSurname: '' });
        } else if (elem.name === 'name') {
            this.setState({ errorName: '' });
        }
    }
    
    createUser = (form) => {
        let user = {
            email: form['email'].value,
            name: form['name'].value,
            surname: form['surname'].value,
            password: form['password'].value
        };
        this.props.registred(user)
    }

    render(){
        const { goToLogin, registred} = this.props;
        return (
            <div className='conteiner-form'>
                <h2>Register</h2>
                <form name='login' noValidate method='post' onSubmit={(e) => { this.validateForm(e) }}>

                    <input type="text" name='name' className='default-input' placeholder='You name'
                        onBlur={(e) => this.isValidtext(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{this.state.errorName}</div>
                   
                    <input type="text" name='surname' className='default-input' placeholder='You surname'
                        onBlur={(e) => this.isValidtext(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{this.state.errorSurname}</div>
                    
                    <input type="email" name='email' className='default-input' placeholder='You email'
                        onBlur={(e) => this.isValidemail(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{this.state.errorEmail}</div>
                    
                    <input type="password" name='password' className='default-input' placeholder='You password'
                        onBlur={(e) => this.isValidpassword(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{this.state.errorPass}</div>
                    
                    <button className='button'>Submit</button>
                </form>
                <p className='link' onClick={ goToLogin }>Go to Login</p>
            </div>
        )
    }
}

export default Register;