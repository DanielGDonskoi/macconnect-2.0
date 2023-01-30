import Searchbar from "./Searchbar"
import { useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { UserContext } from '../contexts/userContext'
import { loginUser, logoutUser } from '../api/auth.js'
import { MyContext } from '../App.js';
function Navbar({title,profile}) {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)
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
    <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
            <div class="flex-1">
                <a class="btn btn-ghost normal-case text-xl">{title}</a>
                <div className="flex-none gap-2">
                
                 </div>
            </div>
            <div className="navbar-center">
                <div className="form-control">
                    <input type="text" placeholder="Search Groups/Users" className="input input-bordered text-neutral" />
                 </div> 
                 <button type="button" name="name"  value = "Remove Assignment" className="btn btn-sm">Search Results</button>
            </div>
            <div className="navbar-end">
            <div class="w-10 rounded-full">
            <img src={null} />
            </div>
            <button type = "button" className="btn btn-sm"> Settings</button>
            <button type="button" name="name"  onClick = {handleClick} value = "Logout" className="btn btn-sm">Log Out</button>
            </div>
    </nav>
    )

}
export default Navbar