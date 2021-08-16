import React from 'react';
import EditProduct from '../EditProductModal/EditProductModal';

export default function ProductCard({ product }) {
    const { image, title, description, price, quantity } = product;
    let noDescText = '**No description provided**';

    return (
        <div className="ProductCard">
            {image ? (
                <img src={image} style={{ width: 150, height: 150 }}></img>
            ) : (
                <img src="https://via.placeholder.com/150"></img>
            )}
            <h3>{title}</h3>
            <p>
                {description || (
                    <span>
                        <i>{noDescText}</i>
                    </span>
                )}
            </p>
            <div className="FlexContainer">
                <p>
                    Price: ${price}
                    {!(price % 1) ? '.00' : ''}
                </p>
                <p>Quantity: {quantity}</p>
            </div>
            <EditProduct product={product} />
        </div>
    );
}
