import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Register extends Component {
    validateUser = (form) => {
        try {
            if ('vasya@com.ua' === form.email.value) {
                throw ({ message: '*This email already exists', elem: form.email });
            } else {
                this.createUser(form);
            }
        } catch (error) {
            this.showError(error, error.elem)
            event.preventDefault()
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

    isValidpassword = (input) => {
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

    isValidtext = (input) => {
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
        let errorBox = input.nextElementSibling;
        input.style.border = '1px solid red'
        errorBox.style.display = 'block';
        errorBox.textContent = error.message;
    }

    hideStatus = (elem) => {
        elem.style.border = '1px solid black';
        elem.nextElementSibling.style.display = 'none';
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
            <div className='conteiner-form wrapp'>
                <h2>Register</h2>
                <form name='login' noValidate method='post' onSubmit={(e) => { this.validateForm(e) }}>
                    <input type="text" name='name' className='default-input' placeholder='You name'
                        onBlur={(e) => this.isValidtext(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>
                    </div>
                    <input type="text" name='surname' className='default-input' placeholder='You surname'
                        onBlur={(e) => this.isValidtext(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>
                    </div>
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
                <p className='link' onClick={ goToLogin }>Go to Login</p>
            </div>
        )
    }
}

export default Register;