import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Products from './components/products/Products';
// import Note from './components/notes/Note';
// import NewNote from './components/notes/NewNote';
// import LoginForm from './components/login/LoginForm';
// import LogOut from './components/login/LogOut';
// import SecuredRoute from './components/auth/SecuredRoute';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={Products}/>
      {/* <Route exact path='/blog/question/:noteId' component={Note}/>
      <Route exact path='/blog/login' component={LoginForm}/>
      <Route exact path='/blog/logout' component={LogOut}/>
      <SecuredRoute path='/blog/new-note' component={NewNote} /> */}
    </div>
  );
}

export default App;
