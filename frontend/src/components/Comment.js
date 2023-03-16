import { useState,useEffect } from "react"
import Commenter from "./Commenter"
const Comment = ({comment}) => {
    console.log(comment)
    const [profile,setprofile] = useState([])
    useEffect(() => {
        const getprofile = async () => {
          const profile = await fetchprofile()
          setprofile(profile)
        }
        getprofile()
      },[])
    const fetchprofile = async() => {
        const res = await fetch(`http://localhost:8000/api/newprofiles/id/${comment.profileid}`)
        const data = await res.json()
    
        return data
    }
    console.log(profile)
    return(

            <div>
            <div class="flex justify-center relative top-1/3">
            <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
            <Commenter profile = {profile}/>
            <p class="-mt-4 text-gray-500">{comment.text}</p>
            </div>
            </div>
            </div>
    
    )

}
export default Comment

