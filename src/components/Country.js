import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { chooseCountry, getCities} from '../store/actions/countriesActions';

class Country extends Component {
    render() {
        return (
                <div className='list'>
                    <h2>Country</h2>
                    <ul className='list-general'>
                        {/* {this.main} */}
                        { this.props.countries.map((country, i) => {
                            return <a onClick={() => this.props.choosed(country._id)} key={i}>
                                <li>{country.name}</li>
                            </a>
                        })}
                    </ul>
                </div>
            )
    }
}
    
function mapStateToProps(state) {
    return {
        countries: state.countriesState.countries,
    }
}

function mapDispatchToProps(dispatch){
    return {
        choosed: (country) => { dispatch(chooseCountry(country))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Country);