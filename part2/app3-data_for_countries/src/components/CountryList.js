import React from 'react';


const CountryListItem = ({country}) => {
	return  (<p>{country.name}</p>);
}

const CountryList = ({countries}) => {

	return (<div>
		
		{countries.length===0 ? (<React.Fragment><p>NO COUNTRIES FOUND</p></React.Fragment>) : countries.reduce((listJsx,country) => listJsx.concat((<CountryListItem country={country} key={country.numericCode} />)),[])}

	</div>)
}


export default CountryList;