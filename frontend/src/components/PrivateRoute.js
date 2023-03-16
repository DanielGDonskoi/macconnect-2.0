import {Outlet, Navigate} from 'react-router-dom'
import { useContext } from 'react'
import { tokenContext } from '../contexts/tokenContext'
const PrivateRoutes = () => {
    const {token} = useContext(tokenContext)
    let checkauth = window.sessionStorage.getItem('access_token')
    let auth = !!token
    return (
        auth ? <Outlet/> : <Navigate to="/" exact/>
    )
}
export default PrivateRoutes