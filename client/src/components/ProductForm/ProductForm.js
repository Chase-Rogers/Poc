import React, { useContext, useEffect, useState } from 'react';
import { ContentContext } from '../../context/ContentProvider';
// import CurrencyInput from 'react-currency-input-field';
import styled from 'styled-components';

const StyledButton = styled.button`
    margin: 10px;
    min-width: 200px;
    border: none;
    font-size: 18px;
    padding: 7px 10px;
    background-color: ${(props) =>
        props.type === 'reset' ? 'white' : 'black'};
    color: ${(props) => (props.type === 'reset' ? 'black' : 'white')};
    &:hover {
        border: ${(props) => (props.type === 'reset' ? 'black' : 'white')} solid 1px;
    }
`;

const StyledInput = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    color: black;
    background: white;
    border: black solid 1px;
    border-radius: 3px;
    max-height: 2rem;
    width: 16rem;
`;

const StyledLabel = styled.label`
    color: #8d8d8d;
    background: #ffffff;
`;

const StyledInputDiv = styled.div`
    text-align: left;
    margin: auto auto;
    display: grid;

`;

export default function ProductForm({
    addProduct,
    setShow,
    product,
    editProduct,
}) {
    const { inputs, setInputs, initInputs } = useContext(ContentContext);

    useEffect(() => {
        setInputs((prevInputs) => ({ ...prevInputs, ...product }));
        return () => {
            setInputs(initInputs);
        };
    }, []);

    const handleClose = () => {
        setShow(false);
    };

    const handlePriceBlur = (e) => {
        let { value } = e.target;
        if (!value.includes('.')) value += '.00'
        else if (value.includes('.')) value = parseFloat(value).toFixed(2);
        setInputs((prevInputs) => ({
            ...prevInputs,
            price: value,
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'e' || e.key === '-' || e.key === '+') e.preventDefault()
    }

    const handleChange1 = (e) => {
        let { name, value } = e.target;
        console.log(e)
        if (name === 'price') {
            
            if (
                value.includes('.') &&
                value.split('.')[1].length >= 2
            ) {
                value = Number(value).toFixed(2);
            }
        }
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        inputs._id ? editProduct(inputs, inputs._id) : addProduct(inputs);
    };

    const handleFileUpload = async (e) => {
        const fileB64 = await convertFileToBase64(e.target.files[0]);
        setInputs((prevInputs) => ({
            ...prevInputs,
            image: fileB64,
        }));
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className="productForm">
            <form className="form" onSubmit={handleSubmit}>
                <StyledInputDiv>
                    <StyledLabel htmlFor="title">Title: </StyledLabel>
                    <StyledInput
                        autoFocus
                        required
                        type="text"
                        name="title"
                        id="title"
                        value={inputs.title}
                        onChange={handleChange1}
                        placeholder="Name of Product"
                    ></StyledInput>
                </StyledInputDiv>
                <StyledInputDiv>
                    <StyledLabel htmlFor="description">
                        Description:{' '}
                    </StyledLabel>
                    <StyledInput
                        type="text"
                        name="description"
                        id="description"
                        value={inputs.description}
                        onChange={handleChange1}
                        placeholder="Description"
                    ></StyledInput>
                </StyledInputDiv>
                <StyledInputDiv>
                    <StyledLabel htmlFor="price">Price: </StyledLabel>
                    <StyledInput
                        type="number"
                        name="price"
                        min="0.00"
                        value={inputs.price}
                        onChange={handleChange1}
                        placeholder="Price"
                        onBlur={handlePriceBlur}
                        onKeyPress={handleKeyPress}
                    ></StyledInput>
                    {/* <CurrencyInput
                        intlConfig={{ locale: 'en-US', currency: 'USD' }}
                        id="price"
                        name="price"
                        placeholder="Price"
                        decimalScale={2}
                        onValueChange={(value, name) => {
                            handleChange1({ target: { value, name } });
                        }}
                        value={inputs.price}
                    /> */}
                </StyledInputDiv>
                <StyledInputDiv>
                    <StyledLabel htmlFor="quantity">Quantity: </StyledLabel>
                    <StyledInput
                        required
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={inputs.quantity}
                        onChange={handleChange1}
                        placeholder="Quantity"
                    ></StyledInput>
                </StyledInputDiv>
                <StyledInputDiv>
                    <StyledLabel htmlFor="image upload button">
                        Image:{' '}
                    </StyledLabel>
                    <StyledInput
                        id="image upload button"
                        type="file"
                        onChange={handleFileUpload}
                        accept="image/png, image/gif, image/jpeg, image/webp, image/svg+xml, image/heic"
                    ></StyledInput>
                    {inputs.image && (
                        <img
                            src={inputs.image}
                            style={{ width: 150, height: 150 }}
                        ></img>
                    )}
                </StyledInputDiv>
                <div>
                <StyledButton type="reset" onClick={handleClose}>
                    Cancel
                </StyledButton>
                <StyledButton type="submit">Submit</StyledButton>
                </div>
                
            </form>
        </div>
    );
}
