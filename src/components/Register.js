import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Form from './helpers/Form'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            formOptions: {
                inputs: [
                    { name: 'name', type: 'text', placeholder: 'You name' },
                    { name: 'surname', type: 'text', placeholder: 'You surname' },
                    { name: 'email', type: 'email', placeholder: 'You email' },
                    { name: 'password', type: 'password', placeholder: 'You password' }],
                name: 'register'
            }
        }
    }

    validateUser = (form) => {
        console.log(form.email)
        try {
            if ('vasya@com.ua' === form.email.value) {
                throw ({ message: '*This email already exists', elem: form.email });
            } else {
                console.log('all ok, go to create')
                this.createUser(form);                
            }
        } catch (error) {
            console.log('error', error)
            event.preventDefault()
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
                <Form options={this.state.formOptions} submitForm={(data)=> this.validateUser(data)}/>
                <p className='link' onClick={() => goToLogin()}>Go to Login</p>
            </div>
        )
    }
}

export default Register;