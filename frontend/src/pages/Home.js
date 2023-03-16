import Navbar from "../components/Navbar"
import CreatePost from "../components/PostCreationForm"
import Post from "../components/Post"
import Posts from "../components/Posts"
import { useContext } from 'react';
import {useState,useEffect} from "react"
import {UserContext} from '../contexts/userContext.js'
import { MyContext } from '../App.js';
import uuid from 'react-uuid';
export default function HomePage({passedusers,passedprofiles}){
    const passed = passedusers;
    
    const uuidtest = uuid();
    
    const [profiles,setprofiles] = useState([])
    const [users,setusers] = useState([])
    const [posts,setposts] = useState([])
    const {user, setUser} = useContext(UserContext)
    const [mount,setMount] = useState(null)
    useEffect(() => {
        const getUsers = async () => {
          const userspassed = await fetchUsers()
          console.log("Users called")
          setusers(userspassed)
        }
        getUsers()
        const getPosts = async () => {
          const postspassed = await fetchPosts()
          console.log("Posts called")
          const orderposts = postspassed.reverse();
          setposts(orderposts)
        }
        getPosts()
        const getProfiles = async () => {
          const profilespassed = await fetchProfiles()
          console.log("Profiles called")
          setprofiles(profilespassed)
          
        }
        getProfiles()
      },[])
    const fetchUsers = async() => {
        const res = await fetch(`http://localhost:8000/api/users`)
        const data = await res.json()
    
        return data
      }
    const fetchProfiles = async() => {
        const res = await fetch(`http://localhost:8000/api/newprofiles`)
        const data = await res.json()
        
        return data
      }
    const fetchPosts = async() => {
        const res = await fetch(`http://localhost:8000/api/posts`)
        const data = await res.json()
        
        return data
    }
    const handleSubmit = (e) => {
      console.log(users)
    }
    handleSubmit()
    console.log(profiles)
    console.log(posts)
    
    return(
      
        <div className = "mb-0">
        <Navbar title = 'MacConnect'  />
        <Posts posts={posts} profiles= {profiles} users = {users} /> 
        </div>
      
    )
}