import Header from "../components/Header"
import Login from "../components/Login"

export default function LoginPage(){
    return(
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div className="container">
        <div class="flex items-center justify-center">
            <img src="http://127.0.0.1:8000/media/None/gearitem.png" width={200} height={200} />
            </div>
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
        </div>
        </div>
        </div>
    )
}