import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'

function Card(props) {
    return (
        <div className='Card'>
            <Link className='Nav-Link' to={`/product/${props.product._id}/show`}>
                <div><img className='card-image' src={props.product.images[0]} alt="" /></div>
                <div className='card-name'>{props.product.name}</div>
                <div className='card-cat-price'>
                    <div className="card-category">{props.product.category}</div>
                    <div className='card-price'>{props.product.price}₪</div>
                </div>
            </Link>
        </div>
    );
}

export default Card;