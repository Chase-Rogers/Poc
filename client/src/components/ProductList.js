import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { ContentContext } from '../context/ContentProvider';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct'

export default function ProductList() {
    const { getProducts, productState, handleDelete } =
        useContext(ContentContext);

    const [state, setState] = useState({show: true});

    // console.log('productState',productState);

    let list = productState.products;

    useEffect(() => {
        getProducts();
    }, []);

    const showModal = () => {
        setState((prevInputs) => {
            return { ...prevInputs, show: !prevInputs.show };
        });
    };

    return (
        <>
            <button
                onClick={() => {
                    showModal();
                }}
            >
                Add Product
            </button>
            {state.show ? null : <AddProduct showModal={showModal} product={list}></AddProduct>}
            <div className="FlexContainer">
                {productState.products
                    ? productState.products.map((product) => {
                          return (
                              <div className="Card" key={`${product._id}`}>
                                  <ProductCard product={product}>
                                      {/* <EditProduct></EditProduct> */}
                                    </ProductCard>
                              </div>
                          );
                      })
                    : ''}
            </div>
        </>
    );
}
