import React, { useContext, useEffect } from "react";
import ProductForm from "./ProductForm";
import { ContentContext } from "../context/ContentProvider";

export default function AddProduct(props) {
    const { addProduct } = useContext(ContentContext);

    return (
        <div className="modal">
            <ProductForm setShow={props.setShow} addProduct={addProduct}></ProductForm>
        </div>
    );
}
