import {useContext} from "react";
import { cartContext } from "../../context/user-context";
import CheckoutItem from "../../checkout-item/checkout-item";

export default function Checkout(){
    let {cartItems, cartTotal} = useContext(cartContext);
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                <span>Product</span>
                </div>
                <div className='header-block'>
                <span>Description</span>
                </div>
                <div className='header-block'>
                <span>Quantity</span>
                </div>
                <div className='header-block'>
                <span>Price</span>
                </div>
                <div className='header-block'>
                <span>Remove</span>
                </div>
            </div>
                {cartItems.map((cartItem) => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))}
            <div className='total'>TOTAL: ₹{cartTotal}</div>
        </div>
    )
}