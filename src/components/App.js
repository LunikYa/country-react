import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import Login                from './Login';
import Register             from './Register';
import MainCountry          from './MainCountry';
import '../main.css'

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
        console.log(data)
        this.setState({ path: 'country' })
    }
    registred = (data) => {
        console.log(data)
        this.setState({ path: 'country' })
    }
    render(){
        if(this.state.path === 'login'){
            return(
                <main className='wrapp'>
                    <Login loged={this.loged} goToRegister={()=>{this.setState({path: 'register'})}}/>
                </main>
            )
        } else if (this.state.path === 'register') {
            return (
                <main className='wrapp'>
                    <Register registred={this.registred} goToLogin={() => { this.setState({ path: 'login' }) }}/>
                </main>
            )
        } else if (this.state.path === 'country') {
            this.getData()
            return (
            <div className='wrapp'>
                <header><h1 className="logo">Country List</h1></header>
                <main>
                    { (this.state.isLoaded) ? <MainCountry data={this.state.data} /> : <div>Loading...</div> }
                </main>
            </div>)
        }
    }
}

function httpGet(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(JSON.parse(this.response));
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error('Network Error'));
        };
        xhr.send();
    });
}

const root = document.getElementById('root');
root ? ReactDOM.render(<App />, root) : false;