import React, {Component} from 'react';
import { loginUser }      from '../store/actions/usersActions';
import { connect }        from 'react-redux';
import { push }           from 'react-router-redux';

class Login extends Component {
    state = {
        email: {
            error: '',
            accepted: false,
        },
        password: {
            error: '',
            accepted: false,
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
        if(result)
            this.props.loginUser(form);
            
        event.preventDefault()
    }

    isValidemail = (input) => {
        let regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regExpEmail.test(input.value)) {
                this.showError('*Email is not valid', input)
                return false
            } else{
                this.setState({ email: { error: '', accepted: true } });
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
            this.setState({ password: { error: '',  accepted: true } })
            return true
        }   
    }

    showError = (error, input) => {
        let erroredState = { error: error,  accepted: false }

        if(input.name === 'email'){
            this.setState({ email: {...erroredState} });
        } else if (input.name === 'password') {            
            this.setState({ password: {...erroredState} });
        }
    }

    hideStatus = (elem) => {
        let defaultState = { error: '', accepted: false };

        if (elem.name === 'email') {
            this.setState({ email: { ...defaultState } });
        } else if (elem.name === 'password') {
            this.setState({ password: { ...defaultState } });
        }
    }

    get emailClass (){
        if (this.state.email.accepted) {
            return 'accept-input';
        } else if (this.state.email.error.length) {
            return 'error-input';
        } else {
            return 'default-input';
        } 
    }
    get passwordClass() {
        if (this.state.password.accepted) {
            return 'accept-input';
        } else if(this.state.password.error.length){
            return 'error-input';
        } else {
            return 'default-input';
        }
    }
   
    render(){ 
        const { email, password } = this.state;
        return (
            <div className='conteiner-form'>
                <h2>Log In</h2>
                <form name='login' noValidate method='post' onSubmit={(e)=>{this.validateForm(e)}}>
                    
                    <input type='email' name='email' className={this.emailClass} placeholder='You email'
                           onBlur={(e) => this.isValidemail(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{ email.error } </div>
                    
                    <input type="password" name='password' className={this.passwordClass} placeholder='You password' 
                           onBlur={(e) => this.isValidpassword(e.target)} onFocus={(e) => this.hideStatus(e.target)} />
                    <div className='errormsg'>{ password.error }</div>

                    <button className='button'>Submit</button>
                </form>

                <p className='link' onClick={this.props.goReg}>Go to Register</p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.userState.user
    }
}

function mapDispatchToProps(dispatch){
    return {
        loginUser: (form) => dispatch(loginUser(`email=${form.email.value}&password=${form.password.value}`)),
        goReg: () => { dispatch(push('/register')) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
