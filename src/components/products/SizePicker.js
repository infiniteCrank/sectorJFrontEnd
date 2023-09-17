import React from 'react';
import { useState, useEffect } from 'react';

function SizePicker({
    quantityMap,
    productId,
    productSizeState,
    saveProductSizeState,
    label='Select your t-shirt size',
    outputLabel='Your size is',
    selectId='sizePicker',
    sizes=['s', 'm', 'l', 'xl']}) {

    let [availableSizes, setAvailableSizes] = useState([])
    useEffect(() => {
        if(!(productSizeState[productId])){
            const newSize = sizes[0];
            saveProductSizeState({productId:productId,newSize})
        }
    })

    useEffect(() =>{
        const productQtyMap = quantityMap[productId]
        const updateSizes = [];
        for(let i in sizes){
            const sizeLetter = sizes[i]
            const numberOfSize = parseInt(productQtyMap[sizeLetter])
            if(numberOfSize>0){
                updateSizes.push(sizeLetter)
            }
        }
        setAvailableSizes(updateSizes)
    }
    ,[quantityMap,sizes,productId,productSizeState,saveProductSizeState]
    )

    const styles = {
        select: {
            marginLeft: '10px'
        }
    };
    const handleChange = (event)=>{
        const newSize=event.target.value;
        saveProductSizeState({productId:productId,newSize})
    
    }
    return (
        <div>
            <label className="form-label" htmlFor={selectId}>{label}</label>
            <select 
                className="form-select" 
                aria-label={"product size for "+productId} 
                value={productSizeState[productId]} 
                id={selectId} 
                onChange={handleChange}
                style={styles.select}
                disabled={(availableSizes.length===0)}
            >
                {availableSizes && (availableSizes.length>0) && availableSizes.map((size,i) => {
                    return <option key={size+productId+i} value={size}>{size && size.toUpperCase()}</option>;
                })}
            </select>

            <p 
            className="text-muted">
                <small>{outputLabel} 
                    <strong>
                        {(productSizeState[productId] && productSizeState[productId].toUpperCase()) 
                        || "Sold Out"}
                    </strong>
                </small>
            </p>
        </div>

    );
}

export default SizePicker;