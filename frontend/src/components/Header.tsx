import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { useNavigate } from "react-router-dom"

function Header() {

    const navigate = useNavigate()
    const { authenticated } = useContext(AuthContext)
    return (
        <div className="w-full p-3 flex items-center justify-around bg-blue-800 text-white font-bold sticky top-0">
            <h1>Blog</h1>
            <div className="w-auto flex gap-5">
                {
                    authenticated ? (
                        <>
                            <button className="btn bg-white border border-white text-blue-800" onClick={() => navigate('/create-post')}>Add Post</button>
                            <button className="btn bg-white border border-red-600 text-red-600" 
                                onClick={()=> {
                                     localStorage.removeItem('token')
                                     window.localStorage.clear()  // To clear the local storage
                                     window.sessionStorage.clear()  // To clear the session storage
                                     window.dispatchEvent(new Event('storage'))  // To trigger the storage event to update the authenticated state in the AuthProvider
                                     window.location.reload()  // To reload the page to update the authenticated state in the AuthProvider
                                }}
                            >Logout</button>
                        </>
                    ) : (
                        <>
                            <button className="btn bg-white border border-white text-blue-800" onClick={() => navigate('/login')}>Login</button>
                            <button className="btn bg-blue-600 border text-white" onClick={() => navigate('/register')}>Register</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Header