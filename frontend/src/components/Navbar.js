import Searchbar from "./Searchbar"
import { useContext } from 'react';
import { SearchContext } from "../contexts/searchContext";
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../contexts/userContext'
import { loginUser, logoutUser } from '../api/auth.js'
import { MyContext } from '../App.js';
import { tokenContext } from "../contexts/tokenContext";
function Navbar({title,profile}) {
    const navigate = useNavigate();
    let pfimage = null;

    const [searchquery,setsearchquery] = useState('')
    const [currentprofile,setcurrentprofile] = useState()
    const [profilepic,setprofilepic] = useState()
    const {user, setUser} = useContext(UserContext)
    const {query,setQuery} = useContext(SearchContext)
    const {token,setToken} = useContext(tokenContext)
    useEffect(() => {
        const getAssignments = async () => {
          const pfpassed = await fetchData()
          setcurrentprofile(pfpassed)
          pfimage = pfpassed.filter(obj => {return obj.name === window.sessionStorage.getItem('username')})
          setprofilepic(pfimage[0].pfp)
        }
        getAssignments()
      },[])
    const fetchData = async() => {
        const res = await fetch(`http://localhost:8000/api/newprofiles`)
        const data = await res.json()
        
        return data
      }
    const PostCreationNav = () => {
        navigate("/createpost")
    }
    const HomeNav= () => {
      navigate("/home")
  }
  const ProfileNav = () => {
    navigate("/profile")
  }
    const handleClick = () => {
        console.log(window.sessionStorage.getItem('username'))
        setUser(null);
        window.sessionStorage.removeItem("username");
        setToken(null)
        logoutUser();
        console.log("logged out")
        console.log(window.sessionStorage.getItem("username"))
        if (window.sessionStorage.getItem("username") == null){
          
          console.log("found null")
          navigate("/")
        }
      };
    const Search = () => {
      console.log(searchquery)
      setQuery(searchquery)
      if (searchquery !== '') {
        navigate("/searchpage")
      }  
    }
    const mine = useContext(MyContext);
    return(
    <nav className='navbar mb-12 sticky top-0 z-50 shadow-lg bg-white text-neutral-content'>
            <div class="flex-1">
                <a class="btn btn-ghost normal-case text-black text-xl font-family:verdana">{title}</a>
                <div className="flex-none gap-2">
                
                 </div>
            </div>
            <div className="navbar-center">
                <div className="form-control">
                    <input type="text" value = {searchquery} onChange = {(e) => setsearchquery(e.target.value)} placeholder="Search Groups/Users" className="input input-bordered text-neutral" />
                 </div> 
                 <button type="button" name="name"  onClick = {Search} value = "Remove Assignment" className="btn btn-sm bg-black">Search Results</button>
            </div>
            <div className="navbar-end">
            <div class="w-10 rounded-full">
            <img src={null} />
            </div>
            <button type = "button" className="btn btn-sm bg-black" onClick ={PostCreationNav}> Create Post</button>
            <div className="w-10 rounded-full btn btn-ghost btn-circle avatar">
            {/* REMEMBER TO CHANGE BOTTOM FUNCTION TO GO TO MESSAGES PAGE INSTEAD*/}
            <button><img src="http://127.0.0.1:8000/media/uploads/png-transparent-computer-icons-home-page-home-page-icon-angle-text-logo-thumbnail.png" onClick={HomeNav} /></button>
            </div>
            {/*<button type="button" name="name"  onClick = {handleClick} value = "Logout" className="btn btn-sm">Log Out</button>*/}
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src={profilepic} />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 text-zinc-900 bg-white shadow menu menu-compact dropdown-content bg-base-red-700 rounded-box w-52">
            <li>
          <a className="justify-between" onClick ={ProfileNav}>
            Profile
          </a>
        </li>
        <li onClick={handleClick}><a>Logout</a></li>
      </ul>
    </div>
            </div>
    </nav>
    )

}
export default Navbar