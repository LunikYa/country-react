import React, { Component } from 'react';
import Filter from './Filter';
import Country from './Country';
import City from './City';

class MainCountry extends Component {
    state = {
        allCountries: [],
        filtredCountries: [],
        allCities: [],
        filtredCities: []  
    }
    componentDidMount(){
        let tempCountries = [];
        for (let key in this.props.data) {
            tempCountries.push(key);
        }       
        let tempCities = [];
        for (let i = 0; tempCities.length < 50; i++) {
            this.props.data[tempCountries[i]].forEach((x) => { tempCities.push(x) })
        }
        this.setState({
            allCountries:     tempCountries, 
            filtredCountries: tempCountries, 
            allCities:        tempCities, 
            filtredCities:    tempCities});    
    }

    updateCities = (val) => {
        if (this.props.data[val])
            this.setState({ filtredCities: this.props.data[val], allCities: this.props.data[val]})
    }

    filterCountries = (val) => {
        this.setState({ filtredCountries: this.filterItems(val, this.state.allCountries) }, this.changeCities);
    }

    changeCities() {
        let temp = [],
            slice = this.state.filtredCountries.slice(0, 3);
        if (slice[0] === 'No matches') {
            temp.push('No matches')
        } else {
            for (let i = 0; i < slice.length; i++) {
                this.props.data[slice[i]].forEach(x => { temp.push(x) })
            }
        }
        this.setState({ filtredCities: temp, allCities: temp})
    }
    
    filterCities = (val) => {
        this.setState({filtredCities: this.filterItems(val, this.state.allCities)})
    }

    filterItems(value, items) {
        let filtredArr = (items.filter((a) => {
            return !(a.toLowerCase().indexOf(value.toLowerCase()) !== 0);
        }))
        if (filtredArr.length === 0) {
            filtredArr.push('No matches');
        }
        return filtredArr;
    }
    
    render(){
        return (
            <div>
                <div className = 'conteiner-list left'>
                    <Filter  filter={this.filterCountries}/>
                    <Country countries={this.state.filtredCountries} choosed={this.updateCities} />
                </div>

                <div className = 'conteiner-list right'>
                    <Filter filter = {this.filterCities} />
                    <City cities = {this.state.filtredCities} />
                </div>
            </div>
        )
    }
}

export default MainCountry;