import React, { Component } from 'react';
import Country from './Country';
import City from './City';
import { filterCity, filterCountry, changeCitiesBySlicedCountries} from '../store/actions'
import { connect } from 'react-redux'

class MainCountry extends Component {   
    updateLists = (val) => {
        this.props.dispatch(filterCountry(val))
        this.props.dispatch(changeCitiesBySlicedCountries())
    }   
    
    render(){
        return (
            <div>
                <div className = 'conteiner-list left'>
                    <input type="text" placeholder='Filter' className='filter-input' onInput={(e) => { this.updateLists(e.target.value)}} />
                    <Country />
                </div>

                <div className = 'conteiner-list right'>
                    <input type="text" placeholder='Filter' className='filter-input' onInput={(e) => this.props.dispatch(filterCity(e.target.value))} />
                    <City />
                </div>
            </div>
        )
    }
}


export default connect(null)(MainCountry)