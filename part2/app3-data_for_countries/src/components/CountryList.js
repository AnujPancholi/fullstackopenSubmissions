import React from 'react';
import Button from './Button.js'

const CountryListItem = ({country,setCustomCountries}) => {

	const setCurrentCountryAsResult = () => {
		setCustomCountries([country]);
	}

	return  (<div><span style={{"padding-right": "5px"}}>{country.name}</span>
		<Button text="View" handleOnClick={setCurrentCountryAsResult} />
		</div>);
}

const CountryList = ({countries,setCustomCountries}) => {

	return (<div>
		
		{countries.length===0 ? (<React.Fragment><p>NO COUNTRIES FOUND</p></React.Fragment>) : countries.reduce((listJsx,country) => listJsx.concat((<CountryListItem country={country} setCustomCountries={setCustomCountries} key={country.numericCode} />)),[])}

	</div>)
}


export default CountryList;