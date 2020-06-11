import React,{useState,forwardRef,useImperativeHandle} from "react";
import CountryList from './CountryList.js';
import CountryView from './CountryView.js';


const SearchResults = ({countries,setCustomCountries},ref) => {

	const [isLoading,setIsLoading] = useState(false);

	useImperativeHandle(ref,() => ({
		setLoading: (value) => {
			setIsLoading(!!value);
		}
	}));

	const RESULTS_THRESHOLD=10;

	console.log(`SearchResults RENDER | isLoading: ${isLoading}`);

	let searchResultJsx = null
	if(isLoading){
		searchResultJsx = (<div>Loading...</div>);
	} else {
		if(countries.length===1){
			searchResultJsx = (<React.Fragment>
				<CountryView country={countries[0]} />
			</React.Fragment>)
		} else if(countries.length>RESULTS_THRESHOLD){
			searchResultJsx = (
				<div>
					<p>Please enter a string that would yield {RESULTS_THRESHOLD} results or less.</p>
				</div>
			)
		} else {
			searchResultJsx = (<React.Fragment>
				<CountryList countries={countries} setCustomCountries={setCustomCountries} />
			</React.Fragment>)
		}
	}

	return searchResultJsx;
}


export default forwardRef(SearchResults);