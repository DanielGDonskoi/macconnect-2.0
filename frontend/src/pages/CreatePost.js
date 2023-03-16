import Navbar from "../components/Navbar"
import CreatePost from "../components/PostCreationForm"
import { useContext } from 'react';
import {useState,useEffect} from "react"
import {UserContext} from '../contexts/userContext.js'
import { MyContext } from '../App.js';
import uuid from 'react-uuid';
export default function CreatePostPage({passedusers}){
    const passed = passedusers;
    console.log(passed);
    const uuidtest = uuid();
    console.log(uuidtest);
    const [assignments,setassignments] = useState([])
    const [users,setusers] = useState([])
    const {user, setUser} = useContext(UserContext)
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
        console.log(window.sessionStorage.getItem('username'));
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
    const handleSubmit = (e) => {
      console.log("submitted")
    }
    return(
        
        <div>
        <Navbar title = 'MacConnect' />
        <div className="h-fit flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-10">
        <div className="h-fit container bg-white">
             <div>placeholder</div>
             <CreatePost/>
        </div>
        </div>
        </div>
        </div>
    )
}