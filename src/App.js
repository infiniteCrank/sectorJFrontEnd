import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Note from './components/notes/Note';
import Notes from './components/notes/Notes';
import LoginForm from './components/login/LoginForm';
import LogOut from './components/login/LogOut';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={Notes}/>
      <Route exact path='/blog/question/:noteId' component={Note}/>
      <Route exact path='/blog/login' component={LoginForm}/>
      <Route exact path='/blog/logout' component={LogOut}/>
    </div>
  );
}

export default App;
