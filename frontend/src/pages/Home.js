import Navbar from "../components/Navbar"
import { useContext } from 'react';
import {UserContext} from '../contexts/userContext.js'
import { MyContext } from '../App.js';

export default function HomePage(){
    const mine = useContext(MyContext);
    console.log(mine)
    const {user, setUser} = useContext(UserContext)
    console.log(user)
    return(
        
        <div>
        <Navbar title = 'MacConnect' />
        <div className="container">
             <div>placeholder</div>
        </div>
        </div>
    )
}