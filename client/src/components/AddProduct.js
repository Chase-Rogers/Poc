import React, { useContext, useEffect } from "react";
import ProductForm from "./ProductForm";
import { ContentContext } from "../context/ContentProvider";

export default function AddProduct(props) {
    // console.log(props)
    const { addProduct } = useContext(ContentContext);

    // useEffect(() => {}, []);

    return (
        <div className="modal">
            <ProductForm showModal={props.showModal} addProduct={addProduct} product={props}></ProductForm>
        </div>
    );
}
