import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Products from './components/products/Products';
import { useState,useEffect } from 'react';
import axios from 'axios';
import adminConfig from "./components/config/admin.json";
import Success from './components/status/Success';
import CancelOrder from './components/status/Cancel';

function App() {
  let [shoppingCart, setShoppingCart] = useState({})
  let [products, setProducts] = useState(null)
  let [productsMap, setProductsMap] = useState({})
  let [quantityMap, setQuantityMap] = useState({})

  const saveCart = (data)=>{
    setShoppingCart(data);
  }

  const saveQuantity = (data)=>{
    setQuantityMap(data);
  }

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
        const newProductMap = {}
        const newQuantityMap = {}
        for (let i in productData) {
            const product = productData[i];
            newProductMap[product._id] = product;
            newQuantityMap[product._id] = product.quantity;
        }
        setQuantityMap(newQuantityMap)
        setProductsMap(newProductMap)
        setProducts(productData)
    })
    .catch((err)=>{console.log(err)})
  },[])

  return (
    <div className="App">
      <NavBar 
        shoppingCart={shoppingCart} 
        saveCart={saveCart} 
        productsMap={productsMap}
        quantityMap={quantityMap}
        saveQuantity={saveQuantity}
      />
    <Switch>
          <Route path="/cancel" render={(props) => 
          <CancelOrder/>} />

          <Route path="/success" render={(props) => 
          <Success/>} />

          <Route path="/" render={(props) => 
          <Products 
              quantityMap={quantityMap}
              saveQuantity={saveQuantity}
              shoppingCart={shoppingCart} 
              products={products}
              productsMap={productsMap}
              saveCart={saveCart} 
              {...props} 
          />} />
    </Switch>
      

    </div>
  );
}

export default App;
