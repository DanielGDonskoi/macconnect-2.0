import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import { createContext } from 'react';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import {v4 as uuid} from 'uuid';
import {useState,useEffect} from "react"
import { useContext } from 'react';
import Button from '@mui/material/Button';
import {UserContext} from './contexts/userContext.js';
import FormExtra from "./components/FormExtra" 
import SignupForm from "./components/SignupForm" 
import Navbar from "./components/Navbar" 
export const MyContext = createContext();
export default function App() {
  const test = 1;
  const handleClick = () => {
    console.log(assignments)
    console.log("yeet")
    const id = uuid();
    console.log(id);
  };
  const handleDeletion = () => {
    console.log("yeet")
  };
  const [assignments,setassignments] = useState([])
  const [users,setusers] = useState([])
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getAssignments = async () => {
      const assignmentspassed = await fetchData()
      console.log(assignmentspassed)
      setassignments(assignmentspassed)
      
    }
    getAssignments()
    const getUsers = async () => {
      const userspassed = await fetchUsers()
      console.log(userspassed)
      setusers(userspassed)
    }
    getUsers()
  },[])
  const fetchUsers = async() => {
    const res = await fetch(`http://localhost:8000/api/users`)
    const data = await res.json()

    return data
  }
  const fetchData = async() => {
    const res = await fetch(`http://localhost:8000/api/newprofiles`)
    const data = await res.json()
    
    return data
  }
  const deleteassignment = async(test) => {
    console.log(assignments)
    const found = (assignments.find(element => element.desc == 'next test user' ))
    const foundid = found.id;
    console.log(foundid)
    await fetch(`http://localhost:8000/api/profiles/${foundid}`,{
      method:'DELETE'
    }
    )
    
    
    setassignments(
      assignments.filter(assignment => (assignment.pk !== test) 
      ))
    
  
  }
if (true){
  return (
    /*<div>
    <Navbar title = 'MacConnect' />
    <div className="container">
    <div className='bg-purple-500'>
      <h1 className='text-xl'>Testing DaisyUI components</h1>
      <button class="btn" onClick={handleClick} >Retrieval Button</button>
      <button class="btn" onClick={deleteassignment}>Deletion Button</button>
      <FormExtra/>
    </div>
    </div>
    <SignupForm/>
    <Route path="/home" element={<HomePage/>} />
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
    </div>
    </div>
    </div>*/
    <div>
     <UserContext.Provider value = {{user, setUser}} >
     <BrowserRouter>
        <Routes>
            <Route path = "/home" element= {<HomePage passedusers={users}/>} />
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
}


