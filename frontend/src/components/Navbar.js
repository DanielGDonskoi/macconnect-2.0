import Searchbar from "./Searchbar"
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../contexts/userContext'
import { loginUser, logoutUser } from '../api/auth.js'
import { MyContext } from '../App.js';
function Navbar({title,profile}) {
    const navigate = useNavigate();
    let pfimage = null;
    const [currentprofile,setcurrentprofile] = useState()
    const [profilepic,setprofilepic] = useState()
    const {user, setUser} = useContext(UserContext)
    useEffect(() => {
        const getAssignments = async () => {
          const pfpassed = await fetchData()
          setcurrentprofile(pfpassed)
          pfimage = pfpassed.filter(obj => {return obj.name === window.localStorage.getItem('username')})
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
    const handleClick = () => {
        console.log(window.localStorage.getItem('username'))
        setUser(null);
        window.localStorage.removeItem("username");
        logoutUser();
        console.log("logged out")
        navigate("/")
      };
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
                    <input type="text" placeholder="Search Groups/Users" className="input input-bordered text-neutral" />
                 </div> 
                 <button type="button" name="name"  value = "Remove Assignment" className="btn btn-sm bg-black">Search Results</button>
            </div>
            <div className="navbar-end">
            <div class="w-10 rounded-full">
            <img src={null} />
            </div>
            <button type = "button" className="btn btn-sm bg-black" onClick ={PostCreationNav}> Create Post</button>
            <div className="w-10 rounded-full btn btn-ghost btn-circle avatar">
            {/* REMEMBER TO CHANGE BOTTOM FUNCTION TO GO TO MESSAGES PAGE INSTEAD*/}
            <button><img src="http://127.0.0.1:8000/media/uploads/3861743-200.png" onClick={PostCreationNav} /></button>
            </div>
            {/*<button type="button" name="name"  onClick = {handleClick} value = "Logout" className="btn btn-sm">Log Out</button>*/}
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src={profilepic} />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 text-zinc-900 bg-white shadow menu menu-compact dropdown-content bg-base-blue-700 rounded-box w-52">
            <li>
          <a className="justify-between" href = "/profile">
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