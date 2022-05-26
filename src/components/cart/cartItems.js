import React from "react";


export default function CartItem({name,quantity, imageUrl, price}){
    
    return (
        <div className="cart-item-container">
            <img src={imageUrl} className="cart-image" ></img>
            <div className="cart-details">
                <h4>{name}</h4>
                <h5 style={{'color': 'grey'}}>Qty: {quantity} Price: ₹{quantity*price}</h5>
            </div>
        </div>
    )
}