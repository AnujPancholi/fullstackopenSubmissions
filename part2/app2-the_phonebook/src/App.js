import React,{useState,useEffect} from 'react';
import './App.css';
import getCounter from "./lib/counter.js";
import axios from "axios";
import {
  PhonebookEntryForm,
  PhonebookListingView
} from "./components/index.js"
//app is split into several components





const App = (props) => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newPhoneNumber,setNewPhoneNumber] = useState('');
  

  let isLoading = persons.length===0 && newName.length===0;

  const populatePersonsData = (async() => {
    console.log(`Effect fired`);
    setTimeout(async() => {
      try{
        const dataFetchResult = await axios({
          method: "GET",
          url: "http://localhost:3001/persons"
        });
        setPersons(dataFetchResult.data);
      }catch(e){
        console.error(`ERROR FETCHING DATA FROM SERVER`,e);
        window.alert("ERROR FETCHING DATA FROM SERVER. CHECK CONSOLE");
      }
    },3000);

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

  //to generate id for each element in a list, so as to not get a warning in the console
  const idGenerator = getCounter(persons.length ? persons[persons.length-1].id : -1);
  


  const submitNewName = (event) => {
    event.preventDefault();
    if(nameSet.has(newName)){
      window.alert(`${newName} already exists.`);
    } else if(newName===""){
      window.alert(`The name cannot be empty`);
    } else if(!newPhoneNumber.match(/^\d+[\d\-]*\d+$/)){
      window.alert(`Invalid phone number "${newPhoneNumber}" - it must only contain digits with hyphens in between being optional`);
    } else {
      const personsEntry = {
        id: idGenerator.next(),
        name: newName,
        phoneNumber: newPhoneNumber
      }
      console.log(`NEW ENTRY: `,personsEntry);
      setPersons(persons.concat(personsEntry));
    }
  }


  console.log(`App RENDER`);
  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookEntryForm handleOnSubmit={submitNewName} handleNewNameChange={handleNewNameChange} handleNewPhoneNumberChange={handlePhoneNumberChange} />
      <PhonebookListingView persons={persons} isLoading={isLoading}/>
    </div>
  )
}

export default App;
