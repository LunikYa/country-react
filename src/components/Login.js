import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Login extends Component {
    validateUser = (form) => {
        try {
            if ('vasya@com.ua' !== form.email.value) {
                throw ({ message: '*No such email was found', elem: form.email });
            } else if ('123456' !== form.password.value) {
                throw ({ message: '*Password is not valid', elem: form.password })
            } else {
                this.props.loged(form.email.value);
            }
        } catch (error) {
            this.showError(error, error.elem)
            event.preventDefault();
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
            }
        }
        (result) ? this.validateUser(form) : event.preventDefault();
    }

    isValidemail = (input) => {
        let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try {
            if (!regExpEmail.test(input.value)) {
                throw ({ message: '*Email is not valid' })
            }
            input.style.border = '1px solid green';
            input.nextElementSibling.style.display = 'none';
            return true
        } catch (error) {
            this.showError(error, input)
            return false
        }
    }

    isValidpassword = (input) => {
        try {
            if (/\W/.test(input.value)) {
                throw ({ message: '*Password can`t include special character'})
            }
            else if (input.value.length < 6) {
                throw ({ message: '*Password must be 6 or more characters'})
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
    
    render(){
        const { loged, goToRegister } = this.props;
        return (
            <div className='conteiner-form wrapp'>
                <h2>Log In</h2>
                <form name='login' noValidate method='post' onSubmit={(e)=>{this.validateForm(e)}}>
                    <input type="email" name='email' className='default-input' placeholder='You email' 
                           onBlur={(e) => this.isValidemail(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>
                    </div>
                    <input type="password" name='password' className='default-input' placeholder='You password' 
                           onBlur={(e) => this.isValidpassword(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>
                    </div>
                    <button className='button'>Submit</button>
                </form>
                <p className='link' onClick={ goToRegister }>Go to Register</p>
            </div>
        )
    }
}

export default Login;