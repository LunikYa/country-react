import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Country              from './Country';
import City                 from './City';
import { push }             from 'react-router-redux';
import { filterCountries, getCountries } from '../store/actions/countriesActions';
import { getCities, filterCities } from '../store/actions/citiesActions'

class MainCountry extends Component {
    updateLists = (event) => {
        let val = event.target.value;
        if(val) 
            this.props.countryFilter(val);
        else
            this.props.countriesGet();
    }

    updateCityList = (event) => {
        let val = event.target.value;
        if(val)
            this.props.cityFilter(val);
    }

    get countryListRender() {
        if (!this.props.isLoaded) {
            this.props.countriesGet()
            
            return <div>Loading...</div>

        } else if (this.props.idCurrentCountry){
            this.props.citiesGet(this.props.idCurrentCountry)
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
        idCurrentCountry: state.countriesState.idCurrentCountry
    }    
}

function mapDispatchToProps(dispatch){
    return {
        countryFilter: (val) => { dispatch(filterCountries(val))},
        countriesGet: () => { dispatch(getCountries())},
        cityFilter: (val) => { dispatch(filterCities(val))},
        citiesGet: (country) => {dispatch(getCities(country))}
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(MainCountry);