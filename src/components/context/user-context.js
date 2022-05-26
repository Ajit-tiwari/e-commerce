import React from "react";
import { createContext,useEffect,useState } from "react";
import { createUserFroAuth, onAuthUserStateChanged, getCategoriesAndDocuments } from "../../utilities/firebase";


let addItemToCartHandle = (cartItems, productToAdd)=>{
    console.log("addItemUserContext Called", cartItems);
    let findProduct = cartItems.find((item)=>item.id === productToAdd.id);

    if(findProduct){
        return cartItems.map((item)=>item.id===productToAdd.id?{...item,quantity: item.quantity+1}:item);
    }

    return [...cartItems,{...productToAdd,quantity: 1}];
}

let removeItemFromCartHandle = (cartItems, productToRemove) =>{
    let findProduct = cartItems.find((item)=>item.id === productToRemove.id);

    if(findProduct.quantity === 1){
        return cartItems.filter((item)=>item.id !== productToRemove.id);
    }

    return cartItems.map((item)=>item.id === productToRemove.id?{...item,quantity: item.quantity - 1}:item);
}

let clearItemFromCartHandle = (cartItems,productToRemove) => {
    return cartItems.filter((item)=>item.id !== productToRemove.id);
}

export const userContext = createContext({
    userLoggedIn: null,
    setUserLoggedIn: ()=>null
});

export const categoriesContext = createContext({
    categories: {},
    setCategories: ()=>{}
});

export const cartContext = createContext({
    isCartOpen: null,
    setIsCartOpen: ()=>null,
    cartItems: null,
    setCartItems: ()=>null,
    addItemToCart:()=>null,
    removeItemFromCart:()=>null,
    clearItemFromCart: ()=>{},
    cartTotal: null,
    setCartTotal: ()=>{}
});



export const UserProvider = ({children})=>{
    let [userLoggedIn,setUserLoggedIn] = useState(null);
    let value = {userLoggedIn,setUserLoggedIn};

    useEffect(()=>{
        let unsubscribe = onAuthUserStateChanged((user)=>{
            if(user){
                createUserFroAuth(user);
            }
    
            setUserLoggedIn(user);
        })

        return unsubscribe;
    },[])

    return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export const CategoryProvider = ({children}) => {
    let [categories,setCategories] = React.useState({});
    let value = {categories,setCategories};

    useEffect(()=>{
        let categories = async()=>{
            let categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap);

            setCategories(categoriesMap);
        }

        categories();
    },[])

    return <categoriesContext.Provider value={value}>{children}</categoriesContext.Provider>
}

export const IsCartOpenProvider = ({children})=>{
    let [isCartOpen,setIsCartOpen] = useState(false);
    let [cartItems,setCartItems] = useState([]);
    let [cartTotal,setCartTotal] = useState(0);

    let addItemToCart = (productToAdd) => {
        setCartItems(addItemToCartHandle(cartItems,productToAdd));
    }

    let removeItemFromCart = (productToRemove) =>{
        setCartItems(removeItemFromCartHandle(cartItems,productToRemove));
    }

    let clearItemFromCart = (productToRemove) => {
        setCartItems(clearItemFromCartHandle(cartItems,productToRemove));
    }

    useEffect(()=>{
        let sum=0;
        cartItems.map((item)=>{
            sum=sum+(item.price*item.quantity);
        })
        setCartTotal(sum);
    },[cartItems])

    let value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        setCartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal
    };

    return<cartContext.Provider value={value}>{children}</cartContext.Provider>
}