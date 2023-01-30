import Navbar from "../components/Navbar"
import { useContext } from 'react';
import {useState,useEffect} from "react"
import {UserContext} from '../contexts/userContext.js'
import { MyContext } from '../App.js';

export default function HomePage({passedusers}){
    const passed = passedusers;
    console.log(passed);
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
        console.log(window.localStorage.getItem('username'));
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
    return(
        
        <div>
        <Navbar title = 'MacConnect' />
        <div className="container">
             <div>placeholder</div>
        </div>
        </div>
    )
}