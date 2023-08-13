import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Products from './components/products/Products';
import { useState } from 'react';

function App() {
  let [shoppingCart, setShoppingCart] = useState({})

  const saveCart = (data)=>{
    setShoppingCart(data);
    console.log(shoppingCart)
  }
  return (
    <div className="App">
      <NavBar shoppingCart={shoppingCart} saveCart={saveCart}/>
      <Route path="/" render={(props) => <Products shoppingCart={shoppingCart} saveCart={saveCart} {...props} />} />
    </div>
  );
}

export default App;
