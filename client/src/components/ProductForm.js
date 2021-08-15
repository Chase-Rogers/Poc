import React, { useContext, useEffect } from 'react';
import { ContentContext } from '../context/ContentProvider';

export default function ProductForm(props) {
    const { addProduct, setShow, product, editProduct} = props;
    console.log(editProduct)
    console.log(product)

    const { inputs, setInputs, initInputs } = useContext(ContentContext);

    const handleClose = () => {
        setShow(false);
    }

    useEffect (() => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            ...product
        }));
    }, [])

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();  
        inputs._id ? editProduct(inputs, inputs._id) : addProduct(inputs);
        // TODO: Only close on success.
        handleClose();
        setInputs(initInputs);
    };

    return (
        <div className="productForm">
            <button onClick={() => {
                    handleClose();
                }}className="close">X</button>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange1}
                    placeholder="Name of Product"
                ></input>
                <input
                    type="text"
                    name="description"
                    value={inputs.description}
                    onChange={handleChange1}
                    placeholder="Description"
                ></input>
                <input
                    type="number"
                    name="price"
                    value={inputs.price}
                    onChange={handleChange1}
                    placeholder="Price"
                ></input>
                <input
                    type="number"
                    name="quantity"
                    value={inputs.quantity}
                    onChange={handleChange1}
                    placeholder="Price"
                ></input>
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
}
