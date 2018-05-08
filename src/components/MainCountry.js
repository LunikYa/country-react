import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Country              from './Country';
import City                 from './City';
import { push }             from 'react-router-redux';
import { filterCity, filterCountry, getCountries, getCities} from '../store/actions';

class MainCountry extends Component {
    updateLists = (val) => {
        if(val) 
            this.props.dispatch(filterCountry(val));
        else
            this.props.dispatch(getCountries(this.props.currentCountry));
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
        if (!this.props.countriesCompleted) {
            this.props.dispatch(getCountries())
            return <div>Loading...</div>
        } 
        if(this.props.currentCountry){
            this.props.dispatch(getCities(this.props.currentCountry))
        }

            return  <div className='conteiner-list left'>
                        <input type="text" placeholder='Filter' className='filter-input' onInput={(e) => { this.updateLists(e.target.value) }} />
                        <Country />
                    </div>
    }
    
    get cityListRender(){
        if (!this.props.citiesCompleted) {
            return <div>Loading...</div>
        } 
        return  <div className='conteiner-list right'>
                        <input type="text" placeholder='Filter' className='filter-input' onInput={this.updateCityList} />
                        <City />
                </div>            
    }
    render(){
        return (
            <div>
                <div>{this.countryListRender}</div>
                <div>{this.cityListRender}</div>
            </div>           
        )
    }
}

function mapStateTopProps(state) {
    return {
        citiesCompleted: state.countriesState.citiesCompleted,
        countriesCompleted: state.countriesState.countriesCompleted,
        currentCountry: state.countriesState.currentCountry._id
    }    
}

export default connect(mapStateTopProps)(MainCountry);