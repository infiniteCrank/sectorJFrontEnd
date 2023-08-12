import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import adminConfig from "../config/admin.json";

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
            <div key={product._id} className="col-sm-12 col-md-4 col-lg-3">
            <Link to={`blog/question/${product._id}`}>
                <div className="card text-white bg-success mb-3">
                <div className="card-body">
                    <h4 className="card-title">{product.name}</h4>
                    <p className="card-text">{product.description}</p>
                </div>
                </div>
            </Link>
            </div>
        ))
        }
    </div>
    </div>
    );
}

export default Products;