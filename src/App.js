import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainCountry from './components/MainCountry';
import './main.css';
import httpGet from './components/helpers';

class App extends Component {
    state = {
            data: {},
            path: 'login',
            isLoaded: false,
        }
    
    getData = () => {
        httpGet('https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.min.json')
            .then(
                response => {
                    this.setState({ data: response, isLoaded: true });
                },
                reject => {
                    console.log(reject)
                }
            );
    }
    
    loged = (data) => {
        this.setState({ path: 'country' })
    }

    registred = (data) => {
        this.setState({ path: 'country' })
    }

    get currentComponent(){
        if (this.state.path === 'login'){
           return <Login loged={this.loged} goToRegister={() => { this.setState({ path: 'register' }) }} />
        }
        else if (this.state.path === 'register') {
            return <Register registred={this.registred} goToLogin={() => { this.setState({ path: 'login' }) }} />
        }
        else if (this.state.path === 'country'){
            this.getData()
            if (this.state.isLoaded) {
                return <MainCountry data={this.state.data} />
            } else {
                return <div>Loading...</div>
            }
        }
        else{
           return <div>This content is empty</div>
        }

    }
    
    render(){
        return(
        <div className='wrapp'>
            <header><h1 className="logo">Country List</h1></header>
            <main>
                { this.currentComponent }
            </main>
        </div>)
    }
}

const root = document.getElementById('root');
root ? ReactDOM.render(<App />, root) : false;