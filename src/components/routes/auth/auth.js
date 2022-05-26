import React from "react";
import SignupForm from "../../signup-form/signup-form";
import SigninForm from "../../signin-form/signin-form";

export default function Auth(){
        
    return (
        <div className="auth-form-container">
            <SigninForm />
            <SignupForm />
        </div>
    )
}