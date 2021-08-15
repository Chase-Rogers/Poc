import React, { useState } from 'react';
import EditProduct from './EditProduct';

export default function ProductCard(props) {
    // const initState = {
    //     show: true,
    // };

    const [state, setState] = useState({show: true, edit: false});

    const showModal = () => {
        setState((prevInputs) => {
            return { ...prevInputs, show: !prevInputs.show };
        });
    };

    return (
        <div className="ProductCard">
            {state.show ? null : (
                <EditProduct product={props.product} showModal={showModal}></EditProduct>
            )}
            <img src="https://via.placeholder.com/150"></img>
            <h3>{props.product.title}</h3>
            <h4>{props.product.description}</h4>
            <div className="FlexContainer">
                <h4>${props.product.price}</h4>
                <h4>Quantity: {props.product.quantity}</h4>
            </div>
            <button
                onClick={() => {
                    showModal();
                }}
            >Edit</button>
        </div>
    );
}
