import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  redirect
} from "react-router-dom";
import SignupPage from './pages/Signup';
import { createContext } from 'react';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import CreatePostPage from './pages/CreatePost';
import SearchPage from './pages/Searchresults';
import PostPage from './pages/Post'
import {v4 as uuid} from 'uuid';
import {useState,useEffect} from "react"
import { useContext } from 'react';
import Button from '@mui/material/Button';
import { SearchContext } from './contexts/searchContext';
import {UserContext} from './contexts/userContext.js';
import { tokenContext } from './contexts/tokenContext';
import FormExtra from "./components/FormExtra" 
import SignupForm from "./components/SignupForm" 
import Navbar from "./components/Navbar" 
import PrivateRoutes from './components/PrivateRoute'
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
  const [query,setQuery] = useState(null);
  const [token,setToken] = useState(null);
  useEffect(() => {
    setToken(token)
    const getAssignments = async () => {
      const assignmentspassed = await fetchData()
      setassignments(assignmentspassed)
      
    }
    getAssignments()
    const getUsers = async () => {
      const userspassed = await fetchUsers()
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
    const found = (assignments.find(element => element.desc == 'next test user' ))
    const foundid = found.id;
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
    <div style = {{backgroundColor: 'rgba(111,0,58,255)'}}>
     <tokenContext.Provider value = {{token,setToken}} >
     <SearchContext.Provider value = {{query,setQuery}} >
     <UserContext.Provider value = {{user, setUser}} >
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route element = {<PrivateRoutes/>}>
            <Route path = "/profile" element= {<ProfilePage passedusers={users} />} />
            <Route path = "/home" element= {<HomePage passedusers={users} passedprofiles={assignments} />} />
            <Route path = "/createpost" element= {<CreatePostPage passedusers={users}/>} />
            <Route path = "/post" element= {<PostPage passedusers={users}/>} />
            <Route path = "/searchpage" element = {<SearchPage/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
      </SearchContext.Provider>
      </tokenContext.Provider>
    </div>
  );
}
}


