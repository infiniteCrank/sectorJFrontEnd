import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import adminConfig from "../config/admin.json";
import Image from '../Image/Image';
import SizePicker from './SizePicker';

function Products() {
    
    let [products, setProducts] = useState(null)
    let [productsMap, setProductsMap] = useState({})
    let [productImages, setProductImages] = useState(null)
    let [productSizes, setProductSizes] = useState({})
    let [shoppingCart, setShoppingCart] = useState({})

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
            for (let i in productData) {
                const product = productData[i];
                newProductMap[product._id] = product;
            }
            setProductsMap(newProductMap)
            setProducts(productData)
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

    const addToCart=(e,productId)=>{
        const priceSplit = productsMap[productId].price.split(".")
        const dollars = parseInt(priceSplit[0].replace("$",""));
        let cents = parseInt(priceSplit[1]);
        console.log("dollars:"+dollars);
        console.log("cents:"+cents);
        cents += dollars*100
        console.log(cents)
        shoppingCart[productId] = {
            "quantity": 1,
            "price_data": {
                "currency": "usd",
                "unit_amount": cents,
                "product_data": {
                    "name": productsMap[productId].name+"-"+productsMap[productId]._id,
                    "description": productSizes[productId],
                    "tax_code":"txcd_99999999"
                }
            }
        }
        setShoppingCart(shoppingCart)
        console.log(shoppingCart)
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
                        <li className="list-group-item">
                            <SizePicker 
                                sizes={product.size.split(",")}
                                productId={product._id}
                                productSizeState={productSizes}
                                setProductSizeState={setProductSizes}
                            />
                        </li>
                        <li className="list-group-item">Price: {product.price}</li>
                    </ul>
                    <div className='container-fluid'>
                        <Link className="btn btn-outline-dark" to={`product/${product._id}`}>View</Link>
                        <button type="button" onClick={(e)=>{addToCart(e,product._id)}} className="btn btn-danger">Add To Cart</button>
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