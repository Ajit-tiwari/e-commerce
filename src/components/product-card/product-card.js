import {useContext} from "react";
import { cartContext } from "../context/user-context";

export default function ProductCard({product}){
    let {id, name, imageUrl, price} = product;
    let {addItemToCart} = useContext(cartContext);

    return(
        <div className="product-card" key={id}>
            <img className="product-card-image" src={imageUrl} alt={name}></img>
            <div className="product-card-footer">
                <span className="product-card-name">{name}</span>
                <span className="product-card-price">{price}</span>
            </div>
            <button className="product-card-button default-button" onClick={()=>addItemToCart(product)}>Add To Cart</button>
        </div>
    )
}