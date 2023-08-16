import React from 'react';
import { useState } from 'react';
import Image from '../Image/Image';
import SizePicker from './SizePicker';

function Products({shoppingCart, saveCart, productsMap, products, quantityMap, saveQuantity}) {
    
    let [productSizes, setProductSizes] = useState({})

    const addToCart=(e,productId)=>{

        //update quantity
        const productSizeChosen = productSizes[productId]
        const productQuantities = {...quantityMap}
        const productQty = productQuantities[productId][productSizeChosen]
        productQuantities[productId][productSizeChosen] = productQty-1

        //change dollars back to cents for stripe
        const priceSplit = productsMap[productId].price.split(".")
        const dollars = parseInt(priceSplit[0].replace("$",""));
        let cents = parseInt(priceSplit[1]);
        cents += dollars*100

        const newCart = {...shoppingCart}
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
            newCart[productId].quantity ++;
            newCart[productId].price_data.product_data.description = 
            productSizeChosen +","+newCart[productId].price_data.product_data.description;
        }
        
        saveCart(newCart)
    }
    const checkQuantities = (productId)=>{
        const quantities = quantityMap[productId]
        let someLeft = false
        for(let size in quantities){
            if(quantities[size]>0){
                someLeft = true
            }
        }
        return someLeft
    }

    return (
    <>
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
                        <button 
                            className="btn btn-outline-dark"
                            data-bs-toggle="modal" 
                            data-bs-target="#viewProductModal"
                        >
                            View
                        </button>
                        <button 
                            type="button" 
                            onClick={(e)=>{addToCart(e,product._id)}} 
                            className="btn btn-danger"
                            disabled={!(checkQuantities(product._id))}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        ))
        }
        </div>
    </div>

    <div className="modal fade" id="viewProductModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                ...
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

export default Products;