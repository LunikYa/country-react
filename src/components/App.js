import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import MainCountry from './MainCountry';
import '../main.css';
import httpGet from './helpers';
import store from '../store';
import { addCountries, createUser} from '../actions'
import { connect } from 'react-redux'

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
                    this.props.dispatch(addCountries(response))
                    console.log(store.getState(), this.props.data)                    
                },
                reject => {
                    console.log(reject)
                }
            );
    }
    
    loged = (data) => {
        try {
            this.props.dispatch(createUser({ user: data }))
            this.setState({ path: 'country' })
        } catch (error) {
            console.log(error)
        }
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
            if (this.state.isLoaded) {
                return <MainCountry data={this.state.data} />
            } else {
                this.getData()
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

function mapStateToProps(state){
    console.log('mapStateProps', state)
    return {
        data: state.countriesReducer.data,

    }
}
export default connect(mapStateToProps)(App)