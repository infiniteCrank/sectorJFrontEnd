import useImage from './useImage'
import { useEffect } from 'react';

const Image = ({ fileName, alt, className, thumbnail, ...rest }) => {
    const { loading, error, image } = useImage(fileName)
    useEffect(() => {if (error != null) {return {alt};}}, [alt, error]);
    if (error) return {alt}

    return (
        <>
            {loading ? (
                "loading..."
            ) : (
                thumbnail?(
                    <img
                    className={`Image${
                        className
                            ? className.padStart(className.length + 1)
                            : ''
                    }`}
                    width={100}
                    height={100}
                    src={image}
                    alt={alt}
                    {...rest}
                />
                ): (
                <img
                    className={`Image${
                        className
                            ? className.padStart(className.length + 1)
                            : ''
                    }`}
                    src={image}
                    alt={alt}
                    {...rest}
                />
                )
                
            )}
        </>
    )
}

export default Image