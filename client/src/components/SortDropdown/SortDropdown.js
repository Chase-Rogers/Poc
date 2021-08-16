import React, { useState, useContext, useEffect } from 'react';
import { ContentContext } from '../../context/ContentProvider';
import styled from 'styled-components';

const StyledDiv = styled.div`
    text-align: right;
`;


const StyledSelect = styled.select`
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
export default function SortDropdown(props) {
    const { productState, setProductState } = useContext(ContentContext);
    const [sortSelected, setSortSelected] = useState('_id');

    useEffect(() => {
        sortProducts(sortSelected);
    }, [sortSelected]);

    const handleSelect = (e) => {
        setSortSelected(e.target.value);
    };

    const sortProducts = (field) => {
        if (productState.products !== null && productState.products.length) {
            const sortType = typeof productState.products[0][field];
            const products = productState.products.sort((a, b) => {
                if (sortType === 'string')
                    return a[field].localeCompare(b[field]);
                else if (sortType === 'number') return a[field] - b[field];
            });
            return setProductState((prevState) => ({
                ...prevState,
                products,
            }));
        }
    };
    return (
        <StyledDiv>
            {productState.products === null ? '' : productState.products.length ? (
                <>
                    <StyledLabel htmlFor="sortList">Sort:</StyledLabel>
                    <StyledSelect
                        name="sortList"
                        id="sortList"
                        value={sortSelected}
                        onChange={handleSelect}
                    >
                        <option value="_id">ID</option>
                        <option value="title">Title</option>
                        <option value="description">Description</option>
                        <option value="price">Price</option>
                        <option value="quantity">Quantity</option>
                    </StyledSelect>
                </>
            ) : <><h1>There are no products available.  Add a product above.</h1></>}
        </StyledDiv>
    );
}
