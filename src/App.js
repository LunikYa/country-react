import React from 'react';
import ReactDOM from 'react-dom';

// import './main.scss';

class App extends React.Component {
    render(){
        return (
            <div className='test'>Test</div>   
        )
    }

}

const root = document.getElementById('root');
root ? ReactDOM.render(<App />, root) : false;

