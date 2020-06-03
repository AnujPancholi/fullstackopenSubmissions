import React,{useState} from 'react';
import './App.css';
import getCounter from "./lib/counter.js";
import {
  Listing,
  PhonebookEntryForm
} from "./components/index.js"


//to generate id for each element in a list, so as to not get a warning in the console
const idGenerator = getCounter(1);


const App = (props) => {
  const [ persons, setPersons ] = useState([
    { 
      id: 1,
      name: 'Arto Hellas',
      phoneNumber: "830-584-3094"
     }
  ]);
  const [ newName, setNewName ] = useState('');
  const [newPhoneNumber,setNewPhoneNumber] = useState('');

  const nameSet = new Set(persons.map(person => person.name));
  
  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }
  


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

  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookEntryForm handleOnSubmit={submitNewName} handleNewNameChange={handleNewNameChange} handleNewPhoneNumberChange={handlePhoneNumberChange} />
      <h2>Numbers</h2>
      <div>
        {
          persons.reduce((jsx,person) => jsx.concat(<React.Fragment><Listing key={person.id} name={person.name} phoneNumber={person.phoneNumber}/><br/></React.Fragment>),[])
        }
      </div>
    </div>
  )
}

export default App;
