const SizeChecker = (props)=>{
    console.log(props.selectedOption)
    const sizesArray = props.sizes.split(",");
    return (
    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group me-2" role="group" aria-label="Second group">
            {
                sizesArray.map(size => (
                    <span key={props.productId+"_"+size+"_key"}>
                        <input 
                            type="radio" 
                            value={size+"-"+props.productId} 
                            checked={props.selectedOption === size+"-"+props.productId}
                            onChange={props.handleChange}
                            className="btn-check" 
                            name="btnRadio" 
                            id={props.productId+"_"+size} 
                            autoComplete="off"
                            />
                        <label 
                            className="btn btn-outline-secondary" 
                            htmlFor={props.productId+"_"+size}
                        >
                            {size.toUpperCase()}
                        </label>
                    </span>
                ))
            }
        </div>
    </div>
    )
}
export default SizeChecker;