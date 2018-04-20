import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Register extends Component {
    state = {
        email: {
            error: '',
            disabled: true,
            accepted: false,
        },
        password: {
            error: '',
            disabled: true,
            accepted: false,
        },
        surname: {
            error: '',
            disabled: true,
            accepted: false
        },
        name: {
            error: '',
            disabled: true,
            accepted: false
        },
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
                this.setState({ email: { error: '', disabled: false, accepted: true } })
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
        this.setState({ password: { error: '', disabled: false, accepted: true } })
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
            if(input.name === 'surname')
                this.setState({ surname: { error: '', disabled: false, accepted: true } })
            else if(input.name === 'name')
                this.setState({ name: { error: '', disabled: false, accepted: true } })
            return true
        }        
    }
    
    showError = (error, input) => {
        let erroredState = { error: error, disabled: false, accepted: false }

        if (input.name === 'email') {
            this.setState({ email: { ...erroredState } });
        } else if (input.name === 'password') {
            this.setState({ password: { ...erroredState } });
        } else if (input.name === 'surname') {
            this.setState({ surname: { ...erroredState } });
        } else if (input.name === 'name') {
            this.setState({ name: { ...erroredState } });
        }
    }

    hideStatus = (elem) => {
        let disabledState = { error: '', disabled: true, accepted: false, errored: false };

        if (elem.name === 'email') {
            this.setState({ email: { ...disabledState } });
        } else if (elem.name === 'password') {
            this.setState({ password: {...disabledState }});
        } else if (elem.name === 'surname') {
            this.setState({surname: { ...disabledState }});
        } else if (elem.name === 'name') {
            this.setState({name: { ...disabledState }});
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
    get emailClass() {
        if (this.state.email.disabled) {
            return 'disable-input';
        } else if (this.state.email.accepted) {
            return 'accept-input';
        } else {
            return 'error-input';
        }
    }
    get passwordClass() {
        if (this.state.password.disabled) {
            return 'disable-input';
        } else if (this.state.password.accepted) {
            return 'accept-input';
        } else {
            return 'error-input';
        }
    }
    get nameClass() {
        if (this.state.name.disabled) {
            return 'disable-input';
        } else if (this.state.name.accepted) {
            return 'accept-input';
        } else {
            return 'error-input';
        }
    }
    get surnameClass() {
        if (this.state.surname.disabled) {
            return 'disable-input';
        } else if (this.state.surname.accepted) {
            return 'accept-input';
        } else {
            return 'error-input';
        }
    }
    render(){
        const { goToLogin } = this.props;
    
        return (
            <div className='conteiner-form'>
                <h2>Register</h2>
                <form name='login' noValidate method='post' onSubmit={(e) => { this.validateForm(e) }}>

                    <input type="text" name='name' className={this.nameClass} placeholder='You name'
                        onBlur={(e) => this.isValidtext(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{this.state.name.error}</div>
                   
                    <input type="text" name='surname' className={this.surnameClass} placeholder='You surname'
                        onBlur={(e) => this.isValidtext(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{this.state.surname.error}</div>
                    
                    <input type="email" name='email' className={this.emailClass} placeholder='You email'
                        onBlur={(e) => this.isValidemail(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{this.state.email.error}</div>
                    
                    <input type="password" name='password' className={this.passwordClass} placeholder='You password'
                        onBlur={(e) => this.isValidpassword(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{this.state.password.error}</div>
                    
                    <button className='button'>Submit</button>
                </form>
                <p className='link' onClick={ goToLogin }>Go to Login</p>
            </div>
        )
    }
}

export default Register;