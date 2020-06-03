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
      name: 'Arto Hellas'
     }
  ]) 
  const [ newName, setNewName ] = useState('')

  
  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  const submitNewName = (event) => {
    event.preventDefault();
    const personsEntry = {
      id: idGenerator.next(),
      name: newName
    }
    console.log(`NEW ENTRY: `,personsEntry);
    setPersons(persons.concat(personsEntry));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookEntryForm handleOnSubmit={submitNewName} handleNewNameChange={handleNewNameChange} />
      <h2>Numbers</h2>
      <div>
        {
          persons.reduce((jsx,person) => jsx.concat(<Listing key={person.id} name={person.name}/>),[])
        }
      </div>
    </div>
  )
}

export default App;
