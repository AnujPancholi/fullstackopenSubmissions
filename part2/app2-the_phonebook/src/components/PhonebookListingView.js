import React,{useState} from "react";
import Listing from "./Listing.js";


const PhonebookListingView = ({persons}) => {

	const [searchString, setSearchString] = useState("");

	const handleSearchStringChange = (event) => {
		setSearchString(event.target.value);
	}


	const clearSearchFilter = (event) => {
		setSearchString("");
	}

	const searchRegex = searchString.length>0 ? new RegExp(searchString,'i') : null;
	const peopleRenderList = persons.filter(person => searchRegex ? searchRegex.test(person.name) : true);


	console.log(`PhonebookListingView RENDER`);
	return (<div>
		<h2>Numbers</h2>
		<br />
		<div>
			Search: <input onChange={handleSearchStringChange} value={searchString} /> { searchRegex ? (<React.Fragment>(Filtered Results)<span onClick={clearSearchFilter} style={{color: "blue","textDecoration": "underline"}}>(Clear)</span></React.Fragment>) : (<React.Fragment></React.Fragment>) }
		</div>
		<br />
      <div>
        {	
          peopleRenderList.length ? peopleRenderList.reduce((jsx,person) => jsx.concat(<React.Fragment key={person.id}><Listing name={person.name} phoneNumber={person.phoneNumber}/><br/></React.Fragment>),[]) : (<React.Fragment><i>No Results Found</i></React.Fragment>)
        }
      </div>
      </div>)
}

export default PhonebookListingView;