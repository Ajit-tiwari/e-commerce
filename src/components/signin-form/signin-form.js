
import React from "react";
import { signInWithGooglePopup, signInUserWithEmailAndPassword, createUserFroAuth } from "../../utilities/firebase";
import { userContext } from "../context/user-context";
import { useContext } from "react";

export default function SigninForm (){
    let [formData,setFormData] = React.useState({
        email: '',
        password: '',
    });

    console.log(formData);

    let {setUserLoggedIn} = useContext(userContext);
    
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
        // login for email nd pswd authentication
        let {email, password} = formData;
        try{
            let res = await signInUserWithEmailAndPassword(email,password);
            console.log(res);
            // setUserLoggedIn(res.user);
        }
        catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Password did not matched');
                    break;
                case 'auth/user-not-found':
                    alert('Email is not registered')
                    break;
                default:
                    console.log('error from sign-in ',error.message);
            }
            
        }
        
    }

    let signInWithGoogle = async()=>{
        let {user} = await signInWithGooglePopup();
        await createUserFroAuth(user);
        // setUserLoggedIn(user);
    }

    return (
        <div className="signin-form-container">
            <h2>Do have a account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleOnSubmit} className="form">
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleOnChange}/>
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleOnChange}/>
                <div className="signin-button-container">   
                    <button className="default-button" type="submit">Sign In</button>
                    <button className="google-button" type="button" onClick={signInWithGoogle}>Google Sign In</button>
                </div>
            </form>
        </div>
    )
}