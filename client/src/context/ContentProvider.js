import React, { useState } from 'react';
import axios from 'axios';

export const ContentContext = React.createContext();

const productAxios = axios.create();

export default function ContentProvider(props) {
    const initInputs = {
        title: '',
        description: '',
        price: 0,
        quantity: 0,
    };

    const [inputs, setInputs] = useState(initInputs);

    const initState = {
        products: [''],
    };

    const [productState, setProductState] = useState(initState);

    function getProducts(productParam) {
        productAxios
            .get(`/api`)
            .then((res) => {
                setProductState((prevState) => ({
                    ...prevState,
                    products: res.data,
                }));
            })
            .catch((err) => console.log('error', err.response.data.errMsg));
    }

    function addProduct(newProduct) {
        productAxios
            .post('/api', newProduct)
            .then((res) => {
                setProductState((prevState) => ({
                    ...prevState,
                    products: [...prevState.products, res.data],
                }));
            })
            .catch((err) => console.log(err.response.data.errMsg));
    }

    const handleDelete = (productId) => {
        return setProductState((prevInputs) => ({
            ...prevInputs,
            products: [
                ...prevInputs.products.filter(
                    (product) => product._id !== productId
                ),
            ],
        }));
    };

    const handleEdit = (updates, productId) => {
        productAxios
            .put(`/api/${productId}`, updates)
            .then((res) => {
                return setProductState((prevProductState) =>{
                    const products = prevProductState.products.map((product) =>
                    product._id !== productId ? product : res.data)
                    return {
                        ...prevProductState,
                        products 
                    }
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <ContentContext.Provider
            value={{
                ...productState,
                initState,
                initInputs,
                inputs,
                productState,
                setInputs,
                setProductState,
                addProduct,
                getProducts,
                handleDelete,
                handleEdit,
            }}
        >
            {props.children}
        </ContentContext.Provider>
    );
}
