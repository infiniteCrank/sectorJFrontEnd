import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import adminConfig from "../config/admin.json";

function NavBar({shoppingCart, saveCart}) {
  let [productTypes, setProductTypes] = useState(null)
  let [itemProductCount, setItemProductCount] = useState(0)

  useEffect(() => {
    const productCount = countItems(shoppingCart)
    setItemProductCount(productCount)
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
    console.log(shoppingCart)
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

  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
      <button className="btn btn-dark" onClick={handleViewCart}>
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
  );
}

export default NavBar;