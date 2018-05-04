import React, { Component } from 'react';
import { Route }            from 'react-router';
import { ConnectedRouter }  from 'react-router-redux';
import { history }          from '../store/store';
import Login                from './Login';
import Register             from './Register';
import MainCountry          from './MainCountry';
import '../main.css';

class App extends Component {
    render(){
        return(
        <div className='wrapp'>
            <header><h1 className="logo">Country List</h1></header>
            <main>
                <ConnectedRouter history={history}>
                    <div>
                        <Route exact path="/"   component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/country"  component={MainCountry} />
                    </div>  
                </ConnectedRouter>
            </main>
        </div>)
    }
}

export default App;