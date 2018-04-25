import React, { Component } from 'react';
import { connect } from 'react-redux';
import Country from './Country';
import City from './City';
import { filterCity, filterCountry, changeCitiesBySlicedCountries, getCountries} from '../store/actions';


class MainCountry extends Component {
    updateLists = (val) => {
        this.props.dispatch(filterCountry(val))
        this.props.dispatch(changeCitiesBySlicedCountries())
    }   

    get mainRender() {
        if (!this.props.completed) {
            this.props.dispatch(getCountries())
            return <div>Loading...</div>
        } 
        return <div>
                    <div className='conteiner-list left'>
                        <input type="text" placeholder='Filter' className='filter-input' onInput={(e) => { this.updateLists(e.target.value) }} />
                        <Country />
                    </div>

                    <div className='conteiner-list right'>
                        <input type="text" placeholder='Filter' className='filter-input' onInput={(e) => this.props.dispatch(filterCity(e.target.value))} />
                        <City />
                    </div> 
                </div>
    }
    render(){
        return (
            <div>
                {this.mainRender}
            </div>           
        )
    }
}

function mapStateTopProps(state) {
    return {
        completed: state.countriesState.completed,
    }
    
}
export default connect(mapStateTopProps)(MainCountry);