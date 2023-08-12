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
  },[productTypes])

  return (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link className="navbar-brand" to="/">
          <img src={process.env.PUBLIC_URL + '/wizduds-logo-small.png'} alt="Wizduds - Extraordinary Clothing" height={100}/>
    </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <Link class="nav-link active" to="/">Home</Link>
        </li>
        <li class="nav-item dropdown">
          <button class="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Products
          </button>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>Action</li>
            <li>Another action</li>
            <li><hr class="dropdown-divider"/></li>
            <li>Something else here</li>
          </ul>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
  </nav>
  );
}

export default NavBar;