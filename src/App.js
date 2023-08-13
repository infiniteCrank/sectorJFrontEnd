import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Products from './components/products/Products';
import { useRef } from 'react';

function App() {
  const productsRef = useRef()
  return (
    <div className="App">
      <NavBar/>
      <Route path="/" render={(props) => <Products text="Hello, " {...props} />} />
    </div>
  );
}

export default App;
