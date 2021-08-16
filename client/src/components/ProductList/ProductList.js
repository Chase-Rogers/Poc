import React, { useEffect, useContext } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import AddProduct from '../AddProductModal/AddProductModal';
import SortDropdown from '../SortDropdown/SortDropdown';
import { ContentContext } from '../../context/ContentProvider';

export default function ProductList() {
    const { getProducts, productState } = useContext(ContentContext);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <h1>Product List Page</h1>
            <AddProduct />
            <SortDropdown />

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
        </div>
    );
}
