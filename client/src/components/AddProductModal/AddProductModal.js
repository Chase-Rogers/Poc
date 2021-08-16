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

const StyledDiv = styled.div`
    text-align: right;
`;

export default function AddProductModal() {
    const { addProduct } = useContext(ContentContext);
    const [showModal, setShowModal] = useState(false);
    return (
        <StyledDiv>
            <StyledButton
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Add Product
            </StyledButton>
            <Modal show={showModal} setShow={setShowModal}>
                <h1>Add Product</h1>
                <ProductForm
                    addProduct={addProduct}
                    setShow={setShowModal}
                ></ProductForm>
            </Modal>
        </StyledDiv>
    );
}
