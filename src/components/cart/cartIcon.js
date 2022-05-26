import {useContext} from "react";
import {ReactComponent as ShopingIcon} from "../../images/shopping-bag.svg";
import { cartContext } from "../context/user-context";


export default function IconCart(){
    let {isCartOpen,setIsCartOpen} = useContext(cartContext);

    function toggleCartShow(){
        console.log("called");
        setIsCartOpen(!isCartOpen);
    }
    return (
        <div className="icon-cart-container" onClick={()=>toggleCartShow()}>
            <ShopingIcon className="shopping-icon" />
        </div>
    )
}