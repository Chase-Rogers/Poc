import React, { useState, useContext } from 'react';
import Modal from '../Modal/Modal';
import ProductForm from '../ProductForm/ProductForm';
import { ContentContext } from '../../context/ContentProvider';
import styled from 'styled-components';

const StyledButton = styled.button`
    margin: 10px;
    min-width: 180px;
    border: ${(props) => (props.type === 'reset' ? 'white' : 'black')} solid 1px;
    font-size: 18px;
    padding: 7px 10px;
    background-color: ${(props) =>
        props.type === 'reset' ? 'white' : 'black'};
    color: ${(props) => (props.type === 'reset' ? 'black' : 'white')};
    &:hover {
        border: ${(props) => (props.type === 'reset' ? 'black' : 'white')} solid
            1px;
    }
`;

export default function EditProductModal({ product }) {
    const { editProduct } = useContext(ContentContext);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <StyledButton
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Edit Product
            </StyledButton>
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
