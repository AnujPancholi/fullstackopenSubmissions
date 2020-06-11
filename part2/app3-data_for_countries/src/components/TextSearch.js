import React from 'react';
import Button from './Button.js';

const TextSearch = ({text,onSearchChange,onSearchSubmit,onSearchClear}) => {

	const searchInputRef = React.createRef();

	const clearSearch = () => {
		searchInputRef.current.value="";
		onSearchClear();
	}

	const buttonsJsx = [];
	if(onSearchSubmit){
		buttonsJsx.push((<Button text="submit" key="BUTTON_SUBMIT" handleOnClick={onSearchSubmit} />))
	}
	if(onSearchClear){
		buttonsJsx.push((<Button text="Clear search" key="BUTTON_CLEAR" handleOnClick={clearSearch} />))
	}

  return (<div>
    {text}
    <input type="text" onChange={onSearchChange} ref={searchInputRef} />
    {(
    	<React.Fragment>
    		{buttonsJsx}
    	</React.Fragment>
    	)}
    </div>)
}


export default TextSearch;