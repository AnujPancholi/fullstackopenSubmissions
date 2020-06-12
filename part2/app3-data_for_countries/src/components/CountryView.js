import React,{useState,useEffect} from 'react';
import weatherWrapper from '../wrappers/weatherStackWrapper.js';


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

const CountryCapitalWeather = ({weatherInfo}) => {

	let weatherJsx = null;

	if(!weatherInfo.isWeatherLoaded){

		weatherJsx = (<React.Fragment>

				<h4>Loading...</h4>

				</React.Fragment>)

	} else {
		if(weatherInfo.success){

			weatherJsx = (<React.Fragment>
				<h4>
					Weather in {weatherInfo.data.location.name}
				</h4>

				<img src={weatherInfo.data.current.weather_icons[0] || ""} alt="weather-icon" style={{"maxHeight": "30px","width": "auto"}} />

				<p>Temperature: {weatherInfo.data.current.temperature}&deg;C</p>
				<p>Description: {weatherInfo.data.current.weather_descriptions.length ? weatherInfo.data.current.weather_descriptions.join(', ') : "NA"}</p>

			</React.Fragment>)

		} else {

			weatherJsx = (<React.Fragment>

				<h4>Could not fetch weather.</h4>

				</React.Fragment>)

			
		}
	}


	return (<div>
		{weatherJsx}
	</div>)


}



const CountryView = ({country}) => {

	// const [isWeatherLoaded,setIsWeatherLoaded] = useState(false);
	const [capitalWeather,setCapitalWeather] = useState({
		isWeatherLoaded: false,
		success: false,
		data: null
	});

	useEffect(() => {
		(async() => {
			try{
				const weatherResponse = await weatherWrapper.getWhetherResponseForQuery(country.capital);

				setCapitalWeather({
					isWeatherLoaded: true,
					success: true,
					data: weatherResponse.result
				});

			}catch(e){
				console.log(`ERROR LOADING WEATHER`,e);

				setCapitalWeather({
					isWeatherLoaded: true,
					success: false,
					data: {
						message: "WEATHER COULD NOT BE LOADED"
					}
				})
			}

		})()
	},[])

	

	console.log("WEATHER: ",capitalWeather);

	return (<div>
		
		<CountryFlag flagURL={country.flag} />
		<CountryTitle name={country.name} />
		<CountryFacts country={country} />
		<CountryLanguages languages={country.languages} />
		<hr />
		<CountryCapitalWeather weatherInfo={capitalWeather} />
		
		

		</div>)
}


export default CountryView;