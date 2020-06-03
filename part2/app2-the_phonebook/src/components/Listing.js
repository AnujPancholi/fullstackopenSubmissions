import React from "react";

const Listing = ({name, phoneNumber}) => {
  return (<div style={{border: "1px solid black"}}>
    Name: {name}<br/>
    Phone: {phoneNumber}
  </div>)
}

export default Listing;