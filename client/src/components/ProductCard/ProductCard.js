import React from 'react';
import EditProduct from '../EditProductModal/EditProductModal';

export default function ProductCard({ product }) {
    const { image, title, description, price, quantity } = product;
    let noDescText = '*No description*';

    return (
        <div className="ProductCard">
            {image ? (
                <img src={image} style={{ width: 150, height: 150 }}></img>
            ) : (
                <img src="https://dummyimage.com/150x150/cccccc/000000.png&text=No+Image+Available"></img>
            )}
            <h3>{title}</h3>
            <div style={{overflowY: 'scroll', height: 55, wordBreak: 'break-all'}}>
                {description || (
                    <span>
                        <i>{noDescText}</i>
                    </span>
                )}
            </div>
            <p>
                Price: ${price}
                {!(price % 1) ? '.00' : ''}
            </p>
            <p>Quantity: {quantity}</p>
            <EditProduct product={product} />
        </div>
    );
}
