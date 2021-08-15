import React, { useContext, useEffect, useState } from 'react';
import { ContentContext } from '../context/ContentProvider';
import EditProduct from './EditProduct';

export default function ProductCard(props) {
    const [show, setShow] = useState(false);
    const {initInputs, setInputs} = useContext(ContentContext)


    useEffect(() => {
        if (!show) setInputs(initInputs);
    },[show])

    return (
        <div className="ProductCard">
            {show ? (
                <EditProduct
                    product={props.product}
                    setShow={setShow}
                ></EditProduct>
            ) : null}
            <img src="https://via.placeholder.com/150"></img>
            <h3>{props.product.title}</h3>
            <h4>{props.product.description}</h4>
            <div className="FlexContainer">
                <h4>${props.product.price}</h4>
                <h4>Quantity: {props.product.quantity}</h4>
            </div>
            <button
                onClick={() => {
                    setShow(true);
                }}
            >
                Edit
            </button>
        </div>
    );
}
