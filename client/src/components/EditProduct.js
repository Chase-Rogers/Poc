import React, { useContext, useEffect } from "react";
import ProductForm from "./ProductForm";
import { ContentContext } from "../context/ContentProvider";

export default function EditProduct(props) {
    // console.log(props)
    const { handleEdit } = useContext(ContentContext);

    // useEffect(() => {}, []);

    return (
        <div className="modal">
            <ProductForm showModal={props.showModal} handleEdit={handleEdit} product={props}></ProductForm>
        </div>
    );
}
