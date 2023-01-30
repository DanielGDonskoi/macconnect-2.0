import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../App.js';
import React from 'react'
import { useNavigate } from "react-router-dom"
import { loginFields } from "../constants/formFields";
import { UserContext } from '../contexts/userContext.js'
import FormAction from "./FormAction";
import { loginUser, logoutUser } from '../api/auth.js'
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)
    const mine = useContext(MyContext);
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(loginState);
        //CURRENTLY WORKING LOGIN
        loginUser(loginState.username, loginState.password).then((data)=>{
            console.log("login successful")
            assignuser()
            console.log(loginState.username);
            window.localStorage.setItem("username", loginState.username);
          })
        console.log(user)
        console.log(loginState)
        console.log(window.localStorage.getItem('username'))
        console.log(JSON.stringify(loginState))
        //authenticateUser(loginState);
        if ((window.localStorage.getItem('username') !== null) ){
            navigate("/home")
        }
    }
    const assignuser=(e)=>{
        setUser({username:"Dan the man"})
    }
    //Handle Login API Integration here
    const authenticateUser = async(loginState) =>{
        const res = await fetch (`http://localhost:8000/signin`,{
            method: 'POST',
            headers: {
            'Content-type':'application/json',
            },
            body: JSON.stringify(loginState)
        })
        const data = await res.json()
        setLoginState(loginState)
        
        // let loginFields={
        //         email:loginState['email-address'],
        //         password:loginState['password']
        // };
           
        // const endpoint=`https://api.loginradius.com/identity/v2/auth/login?apikey=${apiKey}&apisecret=${apiSecret}`;
        //  fetch(endpoint,
        //      {
        //      method:'POST',
        //      headers: {
        //      'Content-Type': 'application/json'
        //      },
        //      body:JSON.stringify(loginFields)
        //      }).then(response=>response.json())
        //      .then(data=>{
        //         //API Success from LoginRadius Login API
        //      })
        //      .catch(error=>console.log(error))
         }
    

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
      
    )
}