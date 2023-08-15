import React from 'react';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import Image from '../Image/Image';
import SizePicker from './SizePicker';

function Products({shoppingCart, saveCart, productsMap, products, quantityMap, saveQuantity}) {
    
    let [productSizes, setProductSizes] = useState({})

    const addToCart=(e,productId)=>{

        //update quantity

        const productSizeChosen = productSizes[productId]
        console.log(productSizeChosen)
        const productQuantities = {...quantityMap}
        const productQty = productQuantities[productId][productSizeChosen]
        console.log("before:")
        console.log(productQty)
        productQuantities[productId][productSizeChosen] = productQty-1
        console.log("after:")
        console.log(productQuantities[productId][productSizeChosen])

        //change dollars back to cents for stripe
        const priceSplit = productsMap[productId].price.split(".")
        const dollars = parseInt(priceSplit[0].replace("$",""));
        let cents = parseInt(priceSplit[1]);
        cents += dollars*100

        const newCart = {...shoppingCart}
        //TODO: check for duplicate ids and update qty on cart remove
        if(!(productId in newCart)){
            // this is a new item
            newCart[productId]= {
                "quantity": 1,
                "price_data": {
                    "currency": "usd",
                    "unit_amount": cents,
                    "product_data": {
                        "name": productsMap[productId].name+"---"+
                                productsMap[productId]._id+"---"+
                                productsMap[productId].image+".jpeg",
                        "description": productSizeChosen+"---"+productsMap[productId].description.substring(0,80) + "...",
                        "tax_code":"txcd_99999999"
                    }
                }
            }
        }else{
            // add to qty in cart: 
            console.log("add to qty")
            newCart[productId].quantity ++;
            newCart[productId].price_data.product_data.description = 
            productSizeChosen +","+newCart[productId].price_data.product_data.description;
            console.log(newCart[productId])
        }
        
        saveCart(newCart)
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
                <Image fileName={(product.image && product.image + ".jpeg")||"no-image.jpeg"} alt={product.name} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <SizePicker 
                                quantityMap={quantityMap}
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