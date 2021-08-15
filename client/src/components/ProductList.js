import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import { ContentContext } from '../context/ContentProvider';
import AddProduct from './AddProduct';

export default function ProductList() {
    const { getProducts, productState, setInputs, initInputs } =
        useContext(ContentContext);

    const [show, setShow] = useState(false);

    console.log('productState', productState);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (!show) setInputs(initInputs);
    }, [show]);

    return (
        <>
            <button
                onClick={() => {
                    setShow(true);
                }}
            >
                Add Product
            </button>
            {show ? (
                <AddProduct
                    setShow={setShow}
                    product={productState.products}
                ></AddProduct>
            ) : null}
            <div className="FlexContainer">
                {productState.products
                    ? productState.products.map((product) => {
                          return (
                              <div className="Card" key={`${product._id}`}>
                                  <ProductCard product={product}></ProductCard>
                              </div>
                          );
                      })
                    : ''}
            </div>
        </>
    );
}
