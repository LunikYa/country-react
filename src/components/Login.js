import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Form from './Form'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            formOptions: {
                inputs: [{ name: 'email', type: 'email', placeholder: 'You email' },
                        { name: 'password', type: 'password', placeholder: 'You password' }],
                name: 'login'
            }
        }
    }
    validateUser = (form) => {
        try {
            if ('vasya@com.ua' !== form.email.value) {
                throw ({ message: '*No such email was found', elem: form.email });
            } else if ('123456' !== form.password.value) {
                throw ({ message: '*Password is not valid', elem: form.password })
            } else {
                this.props.loged('vasya@com.ua');
            }
        } catch (error) {
            error.elem.style.border = '1px solid red'
            let errorBox = error.elem.nextElementSibling;
            errorBox.textContent = error.message;
            errorBox.style.display = 'block'
            event.preventDefault();
        }
    }
    
    render(){
        const { loged, goToRegister } = this.props;
        return (
            <div className='conteiner-form'>
                <h2 onClick={(e) => loged(e.target.textContent)}>Log In</h2>
                <Form options={this.state.formOptions} submitForm={(data) => this.validateUser(data)}/>
                <p className='link' onClick={() => goToRegister()}>Go to Register</p>
            </div>
        )
    }
}

export default Login;