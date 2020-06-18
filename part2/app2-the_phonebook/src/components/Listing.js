import React from "react";

const Button = ({text,handleOnClick}) => {

	return (<React.Fragment>
		<button onClick={handleOnClick}>{text}</button>
	</React.Fragment>)
}

const Listing = ({name, phoneNumber, id, onDeleteListing}) => {

	const deletePersonEntry = () => {
		if(window.confirm(`Are you sure you want to delete ${name}?`)){
			onDeleteListing(id)();
		}
	}


  return (<div style={{border: "1px solid black"}}>
    Name: {name}<br/>
    Phone: {phoneNumber}<br />
    <Button text="Delete" handleOnClick={deletePersonEntry}/>
  </div>)
}

export default Listing;