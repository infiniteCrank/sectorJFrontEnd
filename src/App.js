import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Products from './components/products/Products';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={Products}/>
    </div>
  );
}

export default App;
