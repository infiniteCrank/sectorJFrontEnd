import React from 'react';
import { useState, useEffect } from 'react';

function SizePicker({
    quantityMap,
    productId,
    productSizeState,
    setProductSizeState,
    label='Select your t-shirt size',
    outputLabel='You size is',
    selectId='sizePicker',
    sizes=['s', 'm', 'l', 'xl']}) {

    let [size, setSize] = useState(sizes[0])
    let [availableSizes, setAvailableSizes] = useState([])
    useEffect(() => {
        console.log(productSizeState[productId])
        if(!(productSizeState[productId])){
            productSizeState[productId]=sizes[0];
            setProductSizeState(productSizeState)
        }
    })

    useEffect(() =>{
        const productQtyMap = quantityMap[productId]
        const updateSizes = [];
        for(let i in sizes){
            const size = sizes[i]
            if(productQtyMap[size]>0){
                updateSizes.push(size)
            }
        }
        productSizeState[productId]=updateSizes[0];
        setProductSizeState(productSizeState)
        setSize(updateSizes[0])
        setAvailableSizes(updateSizes)
    },[quantityMap,sizes,productId,productSizeState,setProductSizeState])

    const styles = {
        select: {
            marginLeft: '10px'
        }
    };
    const handleChange = (event)=>{
        const newSize=event.target.value;
        setSize(newSize);
        productSizeState[productId]=newSize;
        setProductSizeState(productSizeState)
    }
    return (
        <div>
            <label className="form-label" htmlFor={selectId}>{label}</label>
            <select 
                className="form-select" 
                aria-label={"product size for "+productId} 
                value={size} 
                id={selectId} 
                onChange={handleChange}
                style={styles.select}
                disabled={(availableSizes.length===0)}
            >
                {(availableSizes.length>0) && availableSizes.map((size) => {
                    return <option key={size} value={size}>{size.toUpperCase()}</option>;
                })}
            </select>

            <p className="text-muted"><small>{outputLabel} <strong>{(size && size.toUpperCase()) || "Sold Out"}</strong></small></p>
        </div>

    );
}

export default SizePicker;