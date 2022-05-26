import React from "react";
import { createAuthUserWithEmailAndPassword, createUserFroAuth } from "../../utilities/firebase";
import { userContext } from "../context/user-context";
import { useContext } from "react";

export default function SignupForm (){
    let [formData,setFormData] = React.useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    let {setUserLoggedIn} = useContext(userContext);

    console.log(formData);
    function handleOnChange(event){
        let {name, value} = event.target;
        setFormData((prevState)=>{
            return {
                ...prevState,
                [name]: value
            }
        });
        
    }

    let handleOnSubmit = async(event)=>{
        event.preventDefault();

        try {
            let { user } = await createAuthUserWithEmailAndPassword(formData.email,formData.password);
            console.log(user);
            
            
            let createUser = await createUserFroAuth(user,{displayName: formData.displayName});
            console.log(createUser);
        
        }
        catch(error){
            if(error.code === "auth/email-already-in-use"){
                alert("Email is already in use !!!");
            }else{
                console.log("Error encountered while sign up",error.message);
            }
        }
    }

    return (
        <div className="signup-form-container">
            <h2>New User</h2>
            <span>Register with email and password</span>
            <form className="form" onSubmit={handleOnSubmit}>
                <label>Display Name</label>
                <input type="text" name="displayName" placeholder="Enter Display Name" value={formData.displayName} onChange={handleOnChange} />
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleOnChange}/>
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleOnChange}/>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Enter Confirm Password" value={formData.confirmPassword} onChange={handleOnChange}/>
                <button className="default-button" type="submit">Sign Up</button>
            </form>

        </div>
    )
}