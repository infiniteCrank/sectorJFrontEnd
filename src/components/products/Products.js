import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import adminConfig from "../config/admin.json";
import Image from '../Image/Image';

function Products() {
    
    let [products, setProducts] = useState(null)

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
            console.log(response.data)
        setProducts(response.data)
        })
        .catch((err)=>{console.log(err)})
    },[])

    return (
    <div className="container">
        <div className="row">
        {products === null && <p>Loading Products...</p>}
        {
        products && products.map(product => (
            <div key={product._id} className="card col-sm-12 col-md-4 col-lg-3">
                <Image fileName={"halloween-season-1-franken-lady.jpeg"} alt={product.name} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <Link className="btn btn-primary" to={`blog/question/${product._id}`}>See Product</Link>
                </div>
            </div>
        ))
        }
        </div>
    </div>
    );
}

export default Products;