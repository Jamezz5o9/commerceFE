import { useState } from "react"
import "./sign-up-form.styles.scss"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth  } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = { 
  displayName : "",
  email : "",
  password : "",
  confirmPassword: ""
}


const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFields = () => {
    setFormFields(defaultFormFields);
}

  console.log(formFields);  

  const handleSubmit = async (event) => {

    event.preventDefault();

    if(password !== confirmPassword) { 
      alert("password didn't match") 
      return;
    }

    try{      

      const {user} = await createAuthUserWithEmailAndPassword(email, password);        
      
      await createUserDocumentFromAuth(user, {displayName})    

      resetFields();
    } 
    catch(error){     
      if(error.code === "auth/email-already-in-use"){
        alert("Email already exist")
      } else{
        alert("User creation encounter an error", error)        
      }
      
    }
    
  } 

  const handleChange = (event) => {

      const {name, value} = event.target;    

      setFormFields({...formFields, [name] : value})
  }

  return(

    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and Password</span> 
      <form onSubmit={handleSubmit} >
        <FormInput
          label="DisplayName"
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />  
        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />  
        <FormInput
          label="Confirm password"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
          required
        />          
        <Button type='submit'>Sign up</Button> 
      </form>
   </div>
  )



}

export default SignUpForm;