import React from 'react';


const CountryTitle = ({name}) => {
	return (<div>
		<h2>
			{name}
		</h2>
	</div>)
}

const CountryFlag = ({flagURL}) => {
	return (<div>
			<img src={flagURL} alt="flag" style={{"height": "75px", "width": "auto"}} />
		</div>)
}

const CountryFacts = ({country}) => {

	return (<div>
		<p>Capital: {country.capital || "NA"}</p>
		<p>Population: {country.population || "NA"}</p>
	</div>)
}

const CountryLanguages = ({languages}) => {

	let languagesJsx = null;

	if(languages.length===0){
		languagesJsx = (<React.Fragment>
			<p>NOT FOUND</p>
			</React.Fragment>);
	} else {
		languagesJsx = (<ul>
		{
			languages.reduce((langJsx,language) => langJsx.concat((<li key={language.name}>{language.name}</li>)),[])
		}
		</ul>)
	}

	return (<div>
		<h4>
		Languages:
		</h4>
		{
			languagesJsx
		}

	</div>)

}



const CountryView = ({country}) => {


	return (<div>
		
		<CountryFlag flagURL={country.flag} />
		<CountryTitle name={country.name} />
		<CountryFacts country={country} />
		<CountryLanguages languages={country.languages} />
		
		




		</div>)
}


export default CountryView;