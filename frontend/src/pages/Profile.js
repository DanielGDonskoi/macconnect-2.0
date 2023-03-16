import Navbar from "../components/Navbar"
import CreatePost from "../components/PostCreationForm"
import { useContext } from 'react';
import {useState,useEffect} from "react"
import {UserContext} from '../contexts/userContext.js'
import { MyContext } from '../App.js';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import uuid from 'react-uuid';
export default function ProfilePage({passedusers,person}){
    const passed = passedusers;
    console.log(passed);
    const [assignments,setassignments] = useState([])
    const [users,setusers] = useState([])
    const [profilepic,setprofilepic] = useState('')
    const [profile,setprofile] = useState('')
    const {user, setUser} = useContext(UserContext)
    useEffect(() => {
        const getAssignments = async () => {
          const assignmentspassed = await fetchData()
          console.log(assignmentspassed)
          setassignments(assignmentspassed)
          let pfimage = assignmentspassed.filter(obj => {return obj.name === window.sessionStorage.getItem('username')})
          setprofilepic(pfimage[0].pfp)
          setprofile(pfimage[0])
        }
        getAssignments()
        const getUsers = async () => {
          const userspassed = await fetchUsers()
          console.log(userspassed)
          setusers(userspassed)
        }
        getUsers()
        console.log(window.sessionStorage.getItem('username'));
      },[])
    const fetchUsers = async() => {
        const res = await fetch(`http://localhost:8000/api/users`)
        const data = await res.json()
    
        return data
      }
    const fetchData = async() => {
        const res = await fetch(`http://localhost:8000/api/newprofiles`)
        const data = await res.json()
        
        return data
      }
    const handleSubmit = (e) => {
      console.log("submitted")
    }
    return(
        
        <div>
        <Navbar title = 'MacConnect' />
        <div className="profilecontainer bg-black">
        <div className="vh-100" style={{ backgroundColor: '#FFFFFF' }}>
      <MDBContainer className="justify-content-center">
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px', alignSelf:'center' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage className="justify-content-center align-items-center"
                      style={{ width: '200px', borderRadius: '10px', alignSelf:'center' }}
                      src={profile.pfp}
                      alt='Generic placeholder image'
                      fluid />
                    
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{profile.name}</MDBCardTitle>
                    <MDBCardText>{profile.bio}</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Articles</p>
                        <p className="mb-0">41</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">976</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">8.5</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <MDBBtn outline className="me-1 flex-grow-1">Chat</MDBBtn>
                      <MDBBtn className="flex-grow-1">Follow</MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
        </div>
        </div>
    )
}