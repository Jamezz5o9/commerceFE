import { createAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"
import React, { useState } from 'react'


const defaultFormInput = {
    email: "",
    password: ""
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormInput);
    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }
    
    const resetInputs = () => {
        setFormFields(defaultFormInput);
    }

    const signInWithGoogle = async () => {        
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetInputs();
        }
        catch(error){
            switch(error.code){
                case "auth/wrong-password" :
                    alert("Incorrect password for email")
                    break;
                
                case "auth/user-not-found":
                    alert("User with associated email not found")
                    break;

                default:
                    console.log(error)
            }
        }
        
    }


  return (
    <div className="sign-in-container">
        <form onSubmit={handleSubmit}>
             <h2>Already have an account?</h2>
            <span>Sign ip with your email and Password</span> 
            <FormInput 
                label = "Email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required            
            />
            <FormInput 
                label = "Password"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required            
            />
            <div className="buttons-container">
                <Button type='submit'>Sign in</Button>            
                <Button buttonType="google" onClick={signInWithGoogle} type="button">Google Sign in</Button>
            </div>
        </form>
    </div>
  )
}

export default SignInForm