import React, { useContext, useEffect } from "react";
import ProductForm from "./ProductForm";
import { ContentContext } from "../context/ContentProvider";

export default function EditProduct(props) {
    const { handleEdit } = useContext(ContentContext);

    return (
        <div className="modal">
            <ProductForm setShow={props.setShow} editProduct={handleEdit} product={props.product}></ProductForm>
        </div>
    );
}
