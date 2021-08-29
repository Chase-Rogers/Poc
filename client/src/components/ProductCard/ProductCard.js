import React, { useContext } from 'react';
import EditProduct from '../EditProductModal/EditProductModal';
import { ContentContext } from '../../context/ContentProvider';
import styled from 'styled-components';

const StyledButton = styled.button`
        margin: 10px;
        min-width: 180px;
        border: ${(props) => (props.type === 'reset' ? 'white' : 'black')} solid
            1px;
        font-size: 18px;
        padding: 7px 10px;
        background-color: ${(props) =>
            props.type === 'reset' ? 'white' : 'black'};
        color: ${(props) => (props.type === 'reset' ? 'black' : 'white')};
        &:hover {
            border: ${(props) => (props.type === 'reset' ? 'black' : 'white')}
                solid 1px;
        }
    `;
    
export default function ProductCard({ product }) {
    

    const { image, title, description, price, quantity } = product;
    const { deleteProduct } = useContext(ContentContext);

    let noDescText = '*No description*';

    const handleDelete = () => {
        deleteProduct(product._id);
    };

    return (
        <div className="ProductCard">
            {image ? (
                <img src={image} style={{ width: 150, height: 150 }}></img>
            ) : (
                <img src="https://dummyimage.com/150x150/cccccc/000000.png&text=No+Image+Available"></img>
            )}
            <h3>{title}</h3>
            <div
                style={{
                    overflowY: 'scroll',
                    height: 55,
                    wordBreak: 'break-all',
                }}
            >
                {description || (
                    <span>
                        <i>{noDescText}</i>
                    </span>
                )}
            </div>
            <p>
                Price: ${price}
                {!(price % 1) ? '.00' : ''}
            </p>
            <p>Quantity: {quantity}</p>
            <EditProduct product={product} />
            <StyledButton onClick={handleDelete}>Delete Product</StyledButton>
        </div>
    );
}
