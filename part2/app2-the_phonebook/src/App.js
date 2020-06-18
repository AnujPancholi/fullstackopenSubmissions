import React,{useState,useEffect,useRef} from 'react';
import './App.css';
import getCounter from "./lib/counter.js";
import backend from "./wrappers/backendWrapper.js";
import {
  PhonebookEntryForm,
  PhonebookListingView
} from "./components/index.js"
//app is split into several components




const App = (props) => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newPhoneNumber,setNewPhoneNumber] = useState('');
  


  //to generate id for each element in a list, so as to not get a warning in the console
  // const idGenerator = getCounter(persons.length===0 ? -1 : persons[persons.length-1].id);

  const phonebookListingRef = useRef(null);


 


  const populatePersonsData = (async() => {
    console.log(`Effect fired`);
    phonebookListingRef.current.setLoading(true);
    // setTimeout(async() => {
      try{
        const personsDataWrapperResponse = await backend.getPersonsData();
        if(!personsDataWrapperResponse.success){
          throw new Error(personsDataWrapperResponse.error.message || "SERVER ERROR");
        }
        setPersons(personsDataWrapperResponse.result);
      }catch(e){
        console.error(`ERROR FETCHING DATA FROM SERVER`,e);
        window.alert("ERROR FETCHING DATA FROM SERVER. CHECK CONSOLE");
      }

      phonebookListingRef.current.setLoading(false);
    // },3000)
  });




  useEffect(() => {
    populatePersonsData();
  },[]);



  const nameSet = new Set(persons.map(person => person.name));
  
  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }

  
  const submitNewName = (event) => {
    event.preventDefault();

    (async() => {
      if(nameSet.has(newName)){
        window.alert(`${newName} already exists.`);
      } else if(newName===""){
        window.alert(`The name cannot be empty`);
      } else if(!newPhoneNumber.match(/^\d+[\d\-]*\d+$/)){
        window.alert(`Invalid phone number "${newPhoneNumber}" - it must only contain digits with hyphens in between being optional`);
      } else {
        const personsEntry = {
          name: newName,
          phoneNumber: newPhoneNumber
        }
        console.log(`NEW ENTRY: `,personsEntry);
        phonebookListingRef.current.clearPhonebookSearchFilter();

        try{
          
          const personEntryAdditionResult = await backend.addPersonEntry(personsEntry);
          if(!personEntryAdditionResult.success){
            throw new Error(personEntryAdditionResult.error.message || "SERVER ERROR");
          }

          console.log(`NEW ENTRY ADDED`);

        }catch(e){
          console.error(`ERROR IN MAKING NEW PERSON ENTRY - `,e);
          window.alert(`ERROR IN MAKING NEW PERSON ENTRY: ${e.message || "PROBABALY A SERVER ISSUE"}`);
        }

        populatePersonsData();
      }
    })();

  }

  const getDeleteFunctionForId = (__id) => {

    return (async() => {

      try{
        const personDeleteResult = await backend.deleteById(__id);
        if(!personDeleteResult.success){
          throw new Error(personDeleteResult.error.message || "SERVER ERROR");
        }

        populatePersonsData();

      }catch(e){
        console.error(`ERROR IN DELETING PERSON ENTRY - `,e);
        window.alert(`ERROR IN DELETING PERSON ENTRY ${e.message || "PROBABALY A SERVER ISSUE"}`);
      }
    })
  }


  console.log(`App RENDER`);
  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookEntryForm handleOnSubmit={submitNewName} handleNewNameChange={handleNewNameChange} handleNewPhoneNumberChange={handlePhoneNumberChange} />
      <PhonebookListingView ref={phonebookListingRef} onReloadFromServer={populatePersonsData} persons={persons} onDeleteListing={getDeleteFunctionForId} />
    </div>
  )
}

export default App;
