import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Login extends Component {
    state = {
            errorPass: '',
            errorEmail: ''
        }

    validateUser = (form) => {
        if ('vasya@com.ua' !== form.email.value) {
            this.showError('*No such email was found', form.email);
        } else if ('123456' !== form.password.value) {
            this.showError('*Password is not valid', form.password);
        } else {
            this.props.loged(form.email.value);
        }
        event.preventDefault();
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
            }
        }
        (result) ? this.validateUser(form) : event.preventDefault();
    }

    isValidemail = (input) => {
        let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regExpEmail.test(input.value)) {
                this.showError('*Email is not valid', input)
                return false
            } else{
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
        else{
            input.className = 'accept-input';
            this.setState({ errorEmail: '' });
            return true
        }   
    }

    showError = (error, input) => {
        input.className = 'error-input';

        if(input.name === 'email'){
            this.setState({ errorEmail: error });
        } else if (input.name === 'password') {            
            this.setState({ errorPass: error });
        }
    }

    hideStatus = (elem) => {
        elem.className = 'disable-input';

        if (elem.name === 'email') {
            this.setState({ errorEmail: '' });
        } else if (elem.name === 'password') {
            this.setState({ errorPass: '' });
        }
    }
    
    render(){
        const { loged, goToRegister } = this.props;
        return (
            <div className='conteiner-form'>
                <h2>Log In</h2>
                <form name='login' noValidate method='post' onSubmit={(e)=>{this.validateForm(e)}}>
                    
                    <input type='email' name='email' className='default-input' placeholder='You email'
                           onBlur={(e) => this.isValidemail(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{ this.state.errorEmail } </div>
                    
                    <input type="password" name='password' className='default-input' placeholder='You password' 
                           onBlur={(e) => this.isValidpassword(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{ this.state.errorPass }</div>
                    
                    <button className='button'>Submit</button>
                </form>
                <p className='link' onClick={ goToRegister }>Go to Register</p>
            </div>
        )
    }
}

export default Login;