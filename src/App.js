import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainCountry from './components/MainCountry';
import './main.css';
import httpGet from './components/helpers';

class App extends Component {
    constructor(){
        super();
        this.state = {
            data: {},
            path: 'login',
            isLoaded: false,
        }
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
        this.getData()
        this.setState({ path: 'country' })
    }

    registred = (data) => {
        this.getData()
        this.setState({ path: 'country' })
    }
    
    render(){
        return(
        <div className='wrapp'>
            <header><h1 className="logo">Country List</h1></header>
            <main>
                {
                    (this.state.path === 'login') ? (
                        <Login loged={this.loged} goToRegister={() => { this.setState({ path: 'register' }) }} />
                    ) : (
                    (this.state.path === 'register') ? (<Register registred={this.registred} goToLogin={() => { this.setState({ path: 'login' }) }} />
                    ) : (
                    (this.state.path === 'country') ? ((this.state.isLoaded) ? (
                        <MainCountry data={this.state.data} />) : (<div>Loading...</div>)
                    ) : (
                        <div>sadsadsa</div>)))

                }
            </main>
        </div>)
    }
}

const root = document.getElementById('root');
root ? ReactDOM.render(<App />, root) : false;