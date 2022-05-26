import {useContext} from "react";
import { cartContext } from "../context/user-context";
import CartItem from "./cartItems";
import { useNavigate } from 'react-router-dom';

export default function CartDropDown(){
    let {cartItems} = useContext(cartContext);
    let navigate = useNavigate();
    let navigateHandle = ()=>{
        navigate('/checkout');
    }
    return (
        <div className="cart-dropdown-container">
            {<div className="list-cart">
                {cartItems.map((item)=>{
                    return <CartItem key={item.id} name={item.name} quantity={item.quantity} imageUrl={item.imageUrl} price={item.price} />
                })}
            </div>}
            <div className="cart-button-container">
                <button className="google-button" onClick={navigateHandle}>Check Out</button>
            </div>
        </div>
    )
}