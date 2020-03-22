import React from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Notes from './components/notes/Notes';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Notes/>
    </div>
  );
}

export default App;
