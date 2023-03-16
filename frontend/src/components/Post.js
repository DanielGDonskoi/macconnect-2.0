import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
function Post({post,profs}) {
    const navigate = useNavigate();
    const [currentprofile,setcurrentprofile] = useState()
    useEffect(() => {
        const getAssignments = async () => {
          const pfpassed = await fetchData()
          setcurrentprofile(pfpassed)
        }
        getAssignments()
      },[])
    const fetchData = async() => {
        const res = await fetch(`http://localhost:8000/api/newprofiles`)
        const data = await res.json()
        
        return data
      }
    const handleClick = () => {
        window.sessionStorage.setItem("lastviewedpost",post.id)
        console.log(window.sessionStorage.getItem('username'))
        navigate("/post")
      };
    return(
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-xl w-full space-y-10">
        <div className="container bg-white min-h-fit">
            <h3>
                {post.name}
            </h3>
            <h3>
                {post.text}
            </h3>
            <h3>
                <li className="btn btn-sm bg-black" onClick={handleClick}><a>View full post and replies</a></li>
            </h3>
            <div className="w-10 rounded-full">
                    <img src={post.img} width={200} height={200} />
            </div>
            <textarea className = "bg-grey-500" rows = "1" />
        </div>
        </div>
        
        </div>
    
    )

}
export default Post