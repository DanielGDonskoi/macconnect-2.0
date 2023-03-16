import Navbar from "../components/Navbar"
import CreatePost from "../components/PostCreationForm"
import { useContext } from 'react';
import {useState,useEffect} from "react"
import Comment from "../components/Comment";
import Comments from "../components/Comments";
import {UserContext} from '../contexts/userContext.js'
import { MyContext } from '../App.js';
import uuid from 'react-uuid';
import CreateComment from "../components/CreateComment";
export default function PostPage({passedusers}){
    const passed = passedusers;
    const [post,setpost] = useState('')
    const [postid,setpostid] = useState('')
    const [profid,setprofid] = useState('')
    const [assignments,setassignments] = useState([])
    const [comments, setcomments] = useState([])
    const [users,setusers] = useState([])
    const [posts,setposts] = useState([])
    const {user, setUser} = useContext(UserContext)
    useEffect(() => {
        const getAssignments = async () => {
          const assignmentspassed = await fetchData()
          console.log(assignmentspassed)
          console.log("here")
          setprofid(assignmentspassed.id)
          setassignments(assignmentspassed)
          
        }
        const getPosts = async () => {
            const postspassed = await fetchPost()
            console.log(postspassed)
            setposts(postspassed)
            setpostid(postspassed.id)
          }
          getPosts()
        getAssignments()
        const getUsers = async () => {
          const userspassed = await fetchUsers()
          console.log(userspassed)
          setusers(userspassed)
        }
        getUsers()
        const getComments = async () => {
          const commentspassed = await fetchComments()
          console.log(commentspassed)
          setcomments(commentspassed)
        }
        getComments()
        console.log(window.sessionStorage.getItem('username'));
      },[])
    const fetchUsers = async() => {
        const res = await fetch(`http://localhost:8000/api/users`)
        const data = await res.json()
    
        return data
      }
    const fetchData = async() => {
        const res = await fetch(`http://localhost:8000/api/newprofiles/specific/${window.sessionStorage.getItem('lastviewedpost')}`)
        const data = await res.json()
        
        return data
      }
    const fetchPost = async() => {
        const res = await fetch(`http://localhost:8000/api/posts/specific/${window.sessionStorage.getItem('lastviewedpost')}`)
        const data = await res.json()
        
        return data
    }
    const fetchComments = async() => {
      const res = await fetch(`http://localhost:8000/api/comments/${window.sessionStorage.getItem('lastviewedpost')}`)
      const data = await res.json()
      
      return data
  }
    const onCreate = async(text) => {
      text['postid'] = postid;
      text['profileid'] = profid;
      text['id'] = uuid();
      addcomment(text)
      
    }
    const addcomment = async(text) => {
      const res = await fetch(`http://localhost:8000/api/comments/create`, {
        method: 'POST', headers: {
          'Content-type':'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(text)
      })
      const data = text
      console.log(text)
      console.log([...comments,text])
      //MODIFY TO ADD AT THE START OF IT
      setcomments([...comments,text])
    }
    return(
        
        <div>
        <Navbar title = 'MacConnect' />
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-10">
        <div className="container bg-white">
             <div>{posts.name}</div>
             <div>{assignments.name}</div>
             <div>{assignments.pfp}</div>
             <div>{posts.id}</div>
             <CreateComment onCreate={onCreate}/>
        </div>
        </div>
        </div>
        <Comments comments={comments}/>
        </div>
    )
}