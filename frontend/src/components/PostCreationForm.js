import { postFields } from "../constants/formFields";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useState} from "react" 
import {useEffect} from "react"
import uuid from 'react-uuid';
const CreatePost = () => {
    const navigate = useNavigate();
    let postcontent = {
    };
    const [profiles,setprofiles] = useState([])
    const [name,setName] = useState('')
    const [text,setAssignment] = useState('')
    const [image,setImage] = useState(null)
    const ondelete1 = () =>  {
        console.log("test")
    }
    useEffect(() => {
      const getprofiles = async () => {
        const profiles = await fetchData()
        console.log(profiles)
        setprofiles(profiles)
        
      }
      getprofiles()
    },[])
    const fetchData = async() => {
      const res = await fetch(`http://localhost:8000/api/newprofiles`)
      const data = await res.json()
      
      return data
    }
    const handleImageChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const found = (profiles.find(element => element.name == window.sessionStorage.getItem('username') ))
        const profileid = found.id;
        console.log(profileid)
        const id = uuid()
        const posted_by = window.sessionStorage.getItem('username')
        let form_data = new FormData
        form_data.append('img',image)
        form_data.append('id',id)
        form_data.append('name',name)
        form_data.append('text',text)
        form_data.append('posted_by',posted_by)
        form_data.append('profileid',profileid)
        postcontent = {name,text,id,posted_by};
        console.log(postcontent);
        console.log(image)
        let url = 'http://localhost:8000/api/posts/';
        axios.post(url, form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
              .then(res => {
                console.log(res.data);
              })
              .catch(err => console.log(err))
              setAssignment('')
              setName('')
              setImage(null)
              navigate('/profile')
        //CreatePost(postcontent);

    }
    const CreatePost= async(postcontent)=>{
        const res = await fetch (`http://localhost:8000/api/posts/`,{
          method: 'POST',
          headers: {
            'Content-type':'application/json',
          },
          body: JSON.stringify(postcontent)
        })
        const data = await res.json()
        
      }
    return (
        <div>
        <form className = "add-form" id="form1" onSubmit={onSubmit}>
            <div className = "form-control">
                <label>Post Name</label>
                <input type = "text" placeholder = "Input Post title" value = {name} onChange={(e) => setName(e.target.value)}/>

            </div>
            <div className = "form-control ">
                <label>Post Content</label>
                <textarea value = {text} rows = "6" onChange={(e) => setAssignment(e.target.value)}/>
            </div>
            <div className = "form-control ">
                <label>Picture</label>
                <input type = "file" onChange={handleImageChange} />
            </div>
            <input type= "submit" name = "name" value = "Create New Post" className="btn btn-block bg-black"/>
            
            
        </form>
        </div>

        
        
        
        
    )
    }
    

export default CreatePost