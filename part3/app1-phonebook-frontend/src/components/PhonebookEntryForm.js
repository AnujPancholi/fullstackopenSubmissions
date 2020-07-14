import React from 'react';


const PhonebookEntryForm = (props) => {
	const {
		handleOnSubmit,
		handleNewNameChange,
		handleNewPhoneNumberChange
	} = props;

	return (<form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={handleNewNameChange} />
        </div>
        <div>
        	Phone Number: <input onChange={handleNewPhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}


export default PhonebookEntryForm;