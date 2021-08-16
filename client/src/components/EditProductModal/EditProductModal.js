import React, { useState, useContext } from 'react';
import Modal from '../Modal/Modal';
import ProductForm from '../ProductForm/ProductForm';
import { ContentContext } from '../../context/ContentProvider';

export default function EditProductModal({ product }) {
    const { editProduct } = useContext(ContentContext);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Edit Product
            </div>
            <Modal setShow={setShowModal} show={showModal}>
                <h1>Edit Product</h1>
                <ProductForm
                    editProduct={editProduct}
                    product={product}
                    setShow={setShowModal}
                ></ProductForm>
            </Modal>
        </>
    );
}
