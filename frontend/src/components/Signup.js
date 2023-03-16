import { useState } from 'react';
import { useContext } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import React from 'react';
import { UserContext } from '../contexts/userContext.js'
import { useNavigate } from "react-router-dom"
import MyContext from "../App.js";
const fields=signupFields;

let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const {user, setUser} = useContext(UserContext)
  
  let navigate = useNavigate();
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    console.log(JSON.stringify(signupState))
    createAccount(signupState)
    navigate(-1);
  }

  //handle Signup API Integration here
  
  const createAccount= async(signupState)=>{
    const res = await fetch (`http://localhost:8000/api/users/`,{
      method: 'POST',
      headers: {
        'Content-type':'application/json',
      },
      body: JSON.stringify(signupState)
    })
    const data = await res.json()
    setSignupState(signupState)
    
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
        
         

      </form>
    )
}