import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const ContentContext = React.createContext();

const productAxios = axios.create();

export default function ContentProvider(props) {
    const initInputs = {
        title: '',
        description: '',
        price: '',
        quantity: '',
        image: '',
    };

    const [inputs, setInputs] = useState(initInputs);

    const [show, setShow] = useState(false);

    const [isSuccessful, setIsSuccessful] = useState(false);
    const initState = {
        products: null,
    };

    const [productState, setProductState] = useState(initState);

    const handleClose = (e) => {
        setShow(false);
    };

    function getProducts() {
        productAxios
            .get(`/api`)
            .then((res) => {
                setProductState((prevState) => ({
                    ...prevState,
                    products: res.data,
                }));
            })
            .catch((err) => {
                toast.error(
                    `Error: ${err.response.status} - ${err.response.statusText}`
                );
                console.log('Error:', err);
            });
    }

    function addProduct(newProduct) {
        productAxios
            .post('/api', newProduct)
            .then((res) => {
                toast.success(
                    `Product ${res.data._id} has been successfully added.`
                );
                setIsSuccessful(true);
                setProductState((prevState) => ({
                    ...prevState,
                    products: [...prevState.products, res.data],
                }));
            })
            .catch((err) => {
                toast.error(
                    `Error: ${err.response.status} - ${err.response.statusText}`
                );
                setIsSuccessful(false);
                console.log('Error:', err);
            });
    }

    const editProduct = (updates, productId) => {
        productAxios
            .put(`/api/${productId}`, updates)
            .then((res) => {
                toast.success(
                    `Product ${productId} has been successfully updated.`
                );
                setIsSuccessful(true);
                return setProductState((prevProductState) => {
                    const products = prevProductState.products.map((product) =>
                        product._id !== productId ? product : res.data
                    );
                    return {
                        ...prevProductState,
                        products,
                    };
                });
            })
            .catch((err) => {
                toast.error(
                    `Error: ${err.response.status} - ${err.response.statusText}`
                );
                setIsSuccessful(false);
                console.log('Error:', err);
            });
    };

    const deleteProduct = (productId) => {
        productAxios
            .delete(`/api/${productId}`)
            .then((res) => {
                toast.success(
                    `Product ${productId} has been successfully deleted.`
                );
                return setProductState((prevProductState) => ({
                    ...prevProductState, 
                    products: [
                        ...prevProductState.products.filter(
                            (product) => product._id !== productId
                        ),
                    ],
                }));   
            })

            .catch((err) => {
                toast.error(
                    `Error: ${err.response.status} - ${err.response.statusText}`
                );
                setIsSuccessful(false);
                console.log('Error:', err);
            });
    };

    return (
        <ContentContext.Provider
            value={{
                ...productState,
                initState,
                initInputs,
                inputs,
                setInputs,
                productState,
                setProductState,
                addProduct,
                editProduct,
                getProducts,
                isSuccessful,
                setIsSuccessful,
                handleClose,
                show,
                setShow,
                deleteProduct,
            }}
        >
            {props.children}
        </ContentContext.Provider>
    );
}
