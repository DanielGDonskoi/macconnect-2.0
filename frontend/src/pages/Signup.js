import Header from "../components/Header";
import React from 'react'
import Signup from "../components/Signup";
import MyContext from "../App.js";
import { useNavigate } from "react-router-dom"
export default function SignupPage(){
    let navigate = useNavigate();
    const value = React.useContext(MyContext);
    return(
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div className="container bg-white">
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>
        </div>
        </div>
        </div>
    )
}