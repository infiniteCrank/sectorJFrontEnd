import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Products from './components/products/Products';
import { useState,useEffect } from 'react';
import axios from 'axios';
import adminConfig from "./components/config/admin.json";

function App() {
  let [shoppingCart, setShoppingCart] = useState({})

  const saveCart = (data)=>{
    setShoppingCart(data);
  }

  let [products, setProducts] = useState(null)
  let [productsMap, setProductsMap] = useState({})

  useEffect(() => {
    axios.post('http://localhost:3000/login',adminConfig)
    .then((tokenData)=>{
    return {
        headers: {'Authorization': tokenData.data.token},
    }
    })
    .then((config)=>{
    return axios.get('http://localhost:3000/products',config)
    })
    .then((response) =>{
        const productData = response.data
        const newProductMap = {...productsMap}
        for (let i in productData) {
            const product = productData[i];
            newProductMap[product._id] = product;
        }
        setProductsMap(newProductMap)
        setProducts(productData)
    })
    .catch((err)=>{console.log(err)})
  },[productsMap])

  return (
    <div className="App">
      <NavBar 
        shoppingCart={shoppingCart} 
        saveCart={saveCart} 
        productsMap={productsMap}
      />
      <Route path="/" render={(props) => 
      <Products 
          shoppingCart={shoppingCart} 
          products={products}
          productsMap={productsMap}
          saveCart={saveCart} 
          {...props} 
      />} />
    </div>
  );
}

export default App;
