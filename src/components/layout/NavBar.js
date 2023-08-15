import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import adminConfig from "../config/admin.json";
import Image from '../Image/Image';

function NavBar({shoppingCart, saveCart}) {
  let [productTypes, setProductTypes] = useState(null)
  let [itemProductCount, setItemProductCount] = useState(0)
  let [productCartArray, setProductCartArray] = useState([])
  let [cartTotal, setCartTotal] = useState([])
  let [cartTax, setCartTax] = useState([])
  let [cartShipping, setCartShipping] = useState([])

  useEffect(() => {
    const productCount = countItems(shoppingCart)
    setItemProductCount(productCount)
    buildCartArray(shoppingCart)
  },[shoppingCart])

  useEffect(() => {
    axios.post('http://localhost:3000/login',adminConfig)
    .then((tokenData)=>{
      return {
        headers: {'Authorization': tokenData.data.token},
      }
    })
    .then((config)=>{
      return axios.get('http://localhost:3000/product/types',config)
    })
    .then((response) =>{
      setProductTypes(response.data)
    })
    .catch((err)=>{console.log(err)})
  },[])

  const handleViewCart = (e)=>{
    //console.log(shoppingCart)
  }

  const countItems = (cart)=>{
    let count = 0
    for(let key in cart){
      if(key){
        count++
      }
    }
    return count
  }

  const buildCartArray = (cart)=>{
    let cartSubTotal = 0
    let ItemCount = 0
    const cartArray =[]
    for(let productId in cart){
      ItemCount++
      const cartObject = cart[productId]
      const product = cartObject.price_data
      cartArray.push(product)
      const productCents = parseInt(product.unit_amount)
      cartSubTotal +=productCents;
    }
    const dollarAndCents = cartSubTotal/100
    let cartTax = dollarAndCents *0.085
    cartTax = (Math.round(cartTax*Math.pow(10,2))/Math.pow(10,2)).toFixed(2)
    const cartShipping = (ItemCount>0)?11:0;
    const cartGrandTotal = parseFloat(dollarAndCents+cartShipping) + parseFloat(cartTax)
    setProductCartArray(cartArray)
    setCartTotal(cartGrandTotal)
    setCartTax(cartTax)
    setCartShipping(cartShipping)
    
  }

  const getProductImageName =(productTitle)=>{
    return productTitle.split("---")[2]
  }
  const getProductId =(productTitle)=>{
    return productTitle.split("---")[1]
  }

  const getProductTitle =(productTitle)=>{
    return productTitle.split("---")[0]
  }

  const getProductDescription =(productDesc)=>{
    return productDesc.split("---")[1]
  }

  const getProductSize =(productDesc)=>{
    return productDesc.split("---")[0].toUpperCase()
  }

  const removeItem = (itemId)=>{
    const newCart = {...shoppingCart}
    delete newCart[itemId]
    saveCart(newCart)
  }

  return (
<div>
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
            <img src={process.env.PUBLIC_URL + '/wizduds-logo-small.png'} alt="Wizduds - Extraordinary Clothing" height={100}/>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <Link className="nav-link active" to="/">Home</Link>
          </li>
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Products
            </button>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {productTypes && productTypes.map((productType) => {
                  return <li key={productType.name} >{productType.name}</li>
              })}
            </ul>
          </li>
        </ul>
        {/* <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form> */}
        <div className="d-flex">
        <button className="btn btn-dark" onClick={handleViewCart} data-bs-toggle="modal" data-bs-target="#exampleModal">
          View Cart
          <span className="badge rounded-pill bg-danger">
            {itemProductCount}
            <span className="visually-hidden">Cart Items</span>
          </span>
        </button>
        </div>
      </div>
    </div>
    </nav>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Shopping Cart</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <ul className="list-group">

              {productCartArray && productCartArray.map(product => (
                <li 
                  key={getProductId(product.product_data.name)} 
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                <Image 
                  fileName={(getProductImageName(product.product_data.name))||"no-image.jpeg"} 
                  alt={product.product_data.name} 
                  className="img-thumbnail rounded float-start"
                  thumbnail={true}
                  />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{getProductTitle(product.product_data.name)}</div>
                  {getProductDescription(product.product_data.description)}
                  <span className="badge bg-dark">Size: {getProductSize(product.product_data.description)}</span>
                </div>
                <h4><span className="badge bg-secondary">${parseInt(product.unit_amount)/100}</span></h4>
                <button 
                onClick={(e)=>{removeItem(getProductId(product.product_data.name))}}
                type="button" 
                className="btn btn-outline-secondary btn-sm"
                >
                  Remove
                </button>
              </li>
              ))}
              
            </ul>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Tax:</div>
                    We charge Virginia state sales tax.
                  </div>
                  <h4><span className="badge bg-secondary">${cartTax}</span></h4>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                      <div className="fw-bold">Shipping:</div>
                      We ship with USPS flat rate shipping in USA and Canada only.
                  </div>
                  <h4><span className="badge bg-secondary">${cartShipping}</span></h4>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="fw-bold">Total:</div>
                  <h4><span className="badge bg-secondary">${cartTotal}</span></h4>
                </li>
            </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger">Checkout Total: ${cartTotal}</button>
            </div>
          </div>
        </div>
      </div>


</div>
  );
}

export default NavBar;