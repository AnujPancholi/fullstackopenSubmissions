import React,{useState} from 'react';
import './App.css';
import getCounter from "./lib/counter.js";
import {
  Listing
} from "./components/index.js"


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
      <form onSubmit={submitNewName}>
        <div>
          name: <input onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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
