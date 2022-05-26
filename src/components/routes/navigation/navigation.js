import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as Logo } from "../../../images/crown.svg";
import { userContext, cartContext } from "../../context/user-context";
import { signOutUser } from "../../../utilities/firebase";

import IconCart from "../../cart/cartIcon";
import CartDropDown from "../../cart/cartDropdown";


export default function Navigation(){
    let {userLoggedIn} = useContext(userContext);
    let {isCartOpen} = useContext(cartContext);
    

    return (
        <Fragment>
            <div className="nav-bar-container">
                <div className="nav-bar-logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className="nav-bar-links">
                    <Link className="nav-link" to="/shop">Shop</Link>
                    {
                        userLoggedIn ? <span className="nav-link" onClick={signOutUser}>Sign Out</span>:
                        <Link className="nav-link" to="/auth">Sign in</Link>
                    }
                    <IconCart />
                </div>
                {isCartOpen && <CartDropDown />}
            </div>
            <Outlet />
        </Fragment>
    )
}