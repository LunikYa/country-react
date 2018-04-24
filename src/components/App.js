import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import MainCountry from './MainCountry';
import { getCountries } from '../store/actions';
import { connect } from 'react-redux';
import '../main.css';

class App extends Component {
    
    get currentComponent(){
        if (this.props.path === 'login'){
           return <Login />
        } 
        else if (this.props.path === 'register') {
            return <Register />
        }
        else if (this.props.path === 'country'){
            if (this.props.completed) {
                return <MainCountry />
            } else {
                this.props.dispatch(getCountries())
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
    return {
        completed: state.countriesState.completed,
        path: state.currentPath.path
    }
}
export default connect(mapStateToProps)(App)