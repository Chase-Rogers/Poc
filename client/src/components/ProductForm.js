import React, { useContext } from 'react';
import { ContentContext } from '../context/ContentProvider';

export default function ProductForm(props) {
    const { addProduct, showModal} = props;

    const { inputs, setInputs, initInputs, getProducts } = useContext(ContentContext);
    // console.log(inputs)

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(inputs);
        // getProducts();
        showModal();
        setInputs(initInputs);
    };

    return (
        <div className="productForm">
            <button onClick={() => {
                    showModal();
                }}className="close">X</button>
            {/* <h1>Add Product</h1> */}
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
