import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Country              from './Country';
import City                 from './City';
import { push }             from 'react-router-redux';
import { filterCity, filterCountry, getCountries, getCities} from '../store/actions';


class MainCountry extends Component {
    updateLists = (val) => {
        this.props.dispatch(filterCountry(val || 'all'))
    }

    goLogin = () =>{
        this.props.dispatch(push('/'))
    }

    get countryListRender() {
        if (!this.props.countriesCompleted) {
            this.props.dispatch(getCountries())
            return <div>Loading...</div>
        } 
        return <div>
                    {this.props.dispatch(getCities())}
                    <div className='link' onClick={this.goLogin}>GO BACK</div>
                    <div className='conteiner-list left'>
                        <input type="text" placeholder='Filter' className='filter-input' onInput={(e) => { this.updateLists(e.target.value) }} />
                        <Country />
                    </div>
                </div>
    }
    
    get cityListRender(){
        if (!this.props.citiesCompleted) {
            return <div>Loading...</div>
        } 
        return  <div className='conteiner-list right'>
                    <input type="text" placeholder='Filter' className='filter-input' onInput={(e) => this.props.dispatch(filterCity(e.target.value))} />
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
    }    
}

export default connect(mapStateTopProps)(MainCountry);