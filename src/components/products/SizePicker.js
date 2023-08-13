import React from 'react';
import { useState, useEffect } from 'react';

function SizePicker({
    productId,
    productSizeState,
    setProductSizeState,
    label='Select your t-shirt size',
    outputLabel='You size is',
    selectId='sizePicker',
    sizes=['s', 'm', 'l', 'xl']}) {

    let [size, setSize] = useState(sizes[0])
    useEffect(() => {
        if(!(productSizeState[productId])){
            productSizeState[productId]=sizes[0];
            setProductSizeState(productSizeState)
        }
    })

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
            <select className="form-select" aria-label={"product size for "+productId} value={size} id={selectId} onChange={handleChange}
                    style={styles.select}>
                {sizes.map((size) => {
                    return <option key={size} value={size}>{size.toUpperCase()}</option>;
                })}
            </select>

            <p className="text-muted"><small>{outputLabel} <strong>{size.toUpperCase()}</strong></small></p>
        </div>

    );
}

export default SizePicker;