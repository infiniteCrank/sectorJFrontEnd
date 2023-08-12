import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import adminConfig from "../config/admin.json";

function NavBar() {
  
  let [productTypes, setProductTypes] = useState(null)

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
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
  </nav>
  );
}

export default NavBar;