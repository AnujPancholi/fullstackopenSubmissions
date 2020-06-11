import React,{useState,useEffect,useRef} from 'react';
import './App.css';
import restCountriesWrapper from './wrappers/restCountriesWrapper.js';

import {
  TextSearch,
  SearchResults
} from './components/index.js';




function App() {

  const [searchString,setSearchString] = useState('');
  const [countries,setCountries] = useState([]);

  const searchResultsRef = useRef(null);

  console.log(`App RENDER`);
  console.log(`SEARCH STRING: ${searchString}`);

  const SEARCH_INACTIVITY_TIMEOUT = 1000; 
  let searchTimeout = null;
  const handleSearchStringChange = (event) => {
    clearInterval(searchTimeout);
    const searchStringValue = event.target.value; 
    searchTimeout = setTimeout(() => {
      setSearchString(searchStringValue);
    },SEARCH_INACTIVITY_TIMEOUT);
  }

  

  const clearSearchString = () => {
    setSearchString('');
  }

  useEffect(() => {

    if(searchString.length>0){
      (async() => {
        try{
          searchResultsRef.current.setLoading(true);
          const wrapperResponse = await restCountriesWrapper.getCountriesResultBySearchString(searchString);
          console.log(`WRAPPER RESPONSE: `,wrapperResponse);
          setCountries(wrapperResponse.result);

        }catch(e){
          console.error(`ERROR IN REFRESHING COUNTRIES: `,e);
          if(e.isWrapperResult){
            if(e.error && e.error.status!==404 && e.error.message!=="EMPTY SEARCHSTRING"){
              window.alert(`ERROR IN REFRESHING COUNTRIES: ${e.message || "UNKNOWN"}`);  
            }
          } else {
            window.alert(`ERROR IN REFRESHING COUNTRIES: ${e.message}`);
          }
          setCountries([]);
        }
        searchResultsRef.current.setLoading(false);
      })();
    } else {
      setCountries([]);
    }
  },[searchString])



  return (
    <div className="App">
      <header className="App-header">
        <p>
          Countries
        </p>
      </header>

      <TextSearch text="Search:" onSearchChange={handleSearchStringChange} onSearchClear={clearSearchString} />

      <SearchResults countries={countries} ref={searchResultsRef} />

    </div>
  );
}

export default App;
