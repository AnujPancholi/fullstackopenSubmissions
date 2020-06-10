import React,{useState,forwardRef,useImperativeHandle} from "react";
import Listing from "./Listing.js";


const PhonebookListingView = ({persons,onReloadFromServer},ref) => {

	const [searchString, setSearchString] = useState("");
	const [isLoading,setIsLoading] = useState(true);


	const handleSearchStringChange = (event) => {
		setSearchString(event.target.value);
	}

	const clearSearchFilter = (event) => {
		setSearchString("");
	}

	const searchRegex = searchString.length>0 ? new RegExp(searchString,'i') : null;
	const peopleRenderList = persons.filter(person => searchRegex ? searchRegex.test(person.name) : true);



	useImperativeHandle(ref,() => ({
		setLoading: (loadingFlag) => {
			setIsLoading(!!loadingFlag);
		},
		clearPhonebookSearchFilter: () => {
			clearSearchFilter();
		} 
	}))

	//have to clear the search filter to handle an edge case
	const handleReloadClick = () => {
		clearSearchFilter();
		onReloadFromServer();
	}



	console.log(`PhonebookListingView RENDER | isLoading: ${isLoading}`);
	const phonebookListingJsx = isLoading ? (<div>
		<h2>Numbers</h2>
		<p>Loading...</p>
      </div>) : (<div>
		<h2>Numbers</h2>
		<button onClick={handleReloadClick}>Reload from server</button>
		<div>
			Search: <input onChange={handleSearchStringChange} value={searchString} /> { searchRegex ? (<React.Fragment>(Filtered Results)<span onClick={clearSearchFilter} style={{color: "blue","textDecoration": "underline"}}>(Clear)</span></React.Fragment>) : (<React.Fragment></React.Fragment>) }
		</div>
		<br />
      <div>
        {	
          peopleRenderList.length ? peopleRenderList.reduce((jsx,person) => jsx.concat(<React.Fragment key={person.id}><Listing name={person.name} phoneNumber={person.phoneNumber}/><br/></React.Fragment>),[]) : (<React.Fragment><i>No Results Found</i></React.Fragment>)
        }
      </div>
      </div>);

	return phonebookListingJsx
}

export default forwardRef(PhonebookListingView);