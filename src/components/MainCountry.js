import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Country              from './Country';
import City                 from './City';
import { push }             from 'react-router-redux';
import { filterCity, filterCountry, getCountries, getCities } from '../store/actions/countriesActions';

class MainCountry extends Component {
    updateLists = (event) => {
        let val = event.target.value;
        if(val) 
            this.props.dispatch(filterCountry(val));
        else
            this.props.dispatch(getCountries());
    }

    updateCityList = (event) => {
        let val = event.target.value;
        if(val)
            this.props.dispatch(filterCity(val));
    }

    goLogin = () =>{
        this.props.dispatch(push('/'))
    }

    get countryListRender() {
        if (!this.props.isLoaded) {
            this.props.dispatch(getCountries())
            return <div>Loading...</div>
        } else if (this.props.currentCountry){
            this.props.dispatch(getCities(this.props.currentCountry))
        } 
        return <div>
            <div className='conteiner-list left'>
                <input type="text" placeholder='Filter' className='filter-input' onInput={this.updateLists} />
                <Country />
            </div>
            <div className='conteiner-list right'>
                <input type="text" placeholder='Filter' className='filter-input' onInput={this.updateCityList} />
                <City />
            </div>
        </div>
    }
    
    render(){
        return (
            <div>
                <div>{this.countryListRender}</div>
            </div>           
        )
    }
}

function mapStateTopProps(state) {
    return {
        isLoaded: state.countriesState.countriesLoaded,
        currentCountry: state.countriesState.currentCountry._id
    }    
}

export default connect(mapStateTopProps)(MainCountry);