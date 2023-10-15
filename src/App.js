import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import Products from './components/products/Products';
import { useState,useEffect } from 'react';
import axios from 'axios';
import hostConfig from "./components/config/hostEnv.json"
import Success from './components/status/Success';
import CancelOrder from './components/status/Cancel';
import ContactUs from './components/static/ContactUs';
import Policies from './components/static/Policies';
import ReactGA from 'react-ga';
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import googleConfig from "./components/config/google-config.json"

function App() {
  const hostEnv = hostConfig.env
  
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
    const apiHost = (hostEnv === "dev")? hostConfig.devApiHost: hostConfig.prodApiHost;
    axios.get(apiHost+'/products')
    .then((response) =>{
        const productData = response.data
        const newProductMap = {}
        const newQuantityMap = {}
        for (let i in productData) {
            const product = productData[i];
            
            if(product.enabled){
              newProductMap[product._id] = product;
              newQuantityMap[product._id] = product.quantity;
            }else{
              delete productData[i]
            }
        }
        setQuantityMap(newQuantityMap)
        setProductsMap(newProductMap)
        setProducts(productData)
    })
    .catch((err)=>{console.log(err)})
  },[hostEnv])

  const handleAcceptCookie = () => {
    const measurementId = googleConfig.measurementId
    console.log("hostenv:"+hostEnv)
    if((hostEnv === "prod" && measurementId)){
      ReactGA.initialize(measurementId);
    }

  };

  const handleDeclineCookie = () => {
    //remove google analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      handleAcceptCookie();
    }
  });

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

          <Route path="/contact" render={(props) => 
          <ContactUs/>} />

          <Route path="/policies" render={(props) => 
          <Policies/>} />

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
      
    <CookieConsent 
      enableDeclineButton
      onAccept={handleAcceptCookie}
      onDecline={handleDeclineCookie}
    >
            We value your privacy.
            This website or its third-party tools process personal data. 
            You can opt out of the collection of information by clicking on the "I decline" button.
    </CookieConsent>
    </div>
  );
}

export default App;
