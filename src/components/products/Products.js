import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import adminConfig from "../config/admin.json";
import Image from '../Image/Image';

function Products() {
    
    let [products, setProducts] = useState(null)
    let [productImages, setProductImages] = useState(null)

    const sizeChecker = (sizes,id)=>{
        const sizesArray = sizes.split(",");
        return sizesArray.map(size => (
            <div className="form-check" key={id+"_"+size+"_key"}>
                <input type="radio" className="btn-check" name="btnradio" id={id+"_"+size} autoComplete="off"/>
                <label className="btn btn-outline-secondary" htmlFor={id+"_"+size}>{size.toUpperCase()}</label>
            </div>
        ))
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
        setProducts(response.data)
        })
        .catch((err)=>{console.log(err)})
    },[])

    useEffect(() => {

        axios.post('http://localhost:3000/login',adminConfig)
        .then((tokenData)=>{
        return {
            headers: {'Authorization': tokenData.data.token},
        }
        })
        .then((config)=>{
        return axios.get('http://localhost:3000/product/images',config)
        })
        .then((response) =>{
            const productImagesObject = response.data;
            const productImages = {}
            for (let i in productImagesObject) {
                const productImage = productImagesObject[i];
                productImages[productImage._id] = productImage.name +"."+ productImage.imageType;
            }
            setProductImages(productImages)
        })
        .catch((err)=>{console.log(err)})
    },[])

    return (
    <div className="container">
        <div className="row">
        {
            products === null && 
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
        {
        products && products.map(product => (
            <div key={product._id} className="card col-sm-12 col-md-4 col-lg-3">
                <Image fileName={(productImages && productImages[product.image])||"no-image.jpeg"} alt={product.name} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Sizes:
                            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                <div className="btn-group me-2" role="group" aria-label="Second group">
                                    {sizeChecker(product.size,product._id)}
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">Price: {product.price}</li>
                    </ul>
                    <div className='container-fluid'>
                        <Link className="btn btn-outline-dark" to={`product/${product._id}`}>View</Link>
                        <button type="button" className="btn btn-danger">Add To Cart</button>
                    </div>
                </div>
            </div>
        ))
        }
        </div>
    </div>
    );
}

export default Products;