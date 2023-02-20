import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {
    let checkauth = window.localStorage.getItem('access_token')
    let auth = !!checkauth
    return (
        auth ? <Outlet/> : <Navigate to="/" exact/>
    )
}
export default PrivateRoutes