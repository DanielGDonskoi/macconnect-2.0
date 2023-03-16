import { useState,useEffect} from 'react'
import Post from "./Post"
const Posts = ({posts,profiles,users}) => {
    console.log(posts)
    console.log(profiles)
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
    function matchProfile(post){
        const profid = post.profileid;
        //const found = (currentprofile.find(element => element.id == profid ))
        //return found.name;
        return currentprofile;
    }
    //profs = {matchProfile(post,profiles)}
    for(const elem of posts) {
        elem.user = 2;
   }
    return (
        <div>
        
        <>
        
        {posts.map((post) => (<Post key={post.id} post = {post} profs = {users} />))}
    </> 
    </div>
    )
}
export default Posts