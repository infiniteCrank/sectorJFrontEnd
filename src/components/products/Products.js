import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import adminConfig from "../config/admin.json";
import Image from '../Image/Image';
//import SizeChecker from './SizeChecker';

function Products() {
    
    let [products, setProducts] = useState(null)
    let [productImages, setProductImages] = useState(null)
    const [selectedSizes, setSelectedSizes] = useState({});

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

    const handleSizeChange = (event)=>{
        const sizeChange = event.target.value
        const sizeID = sizeChange.split("-")
        selectedSizes[sizeID[1]] = sizeID[0]
        setSelectedSizes(selectedSizes)
        console.log(selectedSizes)
    }

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
                            {/* <SizeChecker 
                            sizes={product.size} 
                            productId={product._id} 
                            selectedOption={selectedSizes} handleChange={handleSizeChange}/> */}
                            SizePicker
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