import React from 'react';


const PhonebookEntryForm = (props) => {
	const {
		handleOnSubmit,
		handleNewNameChange
	} = props;

	return (<form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}


export default PhonebookEntryForm;