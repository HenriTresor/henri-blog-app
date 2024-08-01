/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider"
import api from "../utils/api"
import toast from "react-hot-toast"
function Signup() {

    const { authenticated, setAuthenticated, setUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const form = useRef<any>(null)
    useEffect(() => {
        if (authenticated) {
            setAuthenticated(true)
            window.location.href = '/'
        }
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(form.current)
            const email = formData.get('email')
            const name = formData.get('name')
            const password = formData.get('password')
            const res = await api.server.POST('/auth/register', { email, name, password })
            const data = await res.json()
            if (!data.status) return toast.error(data.message)
            setAuthenticated(true)
            setUser(data.user)
            localStorage.setItem("token", data.access_token)
            localStorage.setItem("user", JSON.stringify(data.user))
            window.location.href = '/'
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="w-full h-[100dvh] flex items-center">
            <div className="w-1/2 flex justify-center flex-col gap-5 text-center">
                <h1 className="text-[2rem]"> Welcome  To Henri Blog!</h1>
                <p className="text-[1.3rem]"> Register To Continue!</p>
            </div>
            <div className="w-1/2 flex justify-center">
                <form className="flex flex-col w-[70%]" onSubmit={(e) => handleSubmit(e)} ref={form}>
                    <input className="w-full p-5 mb-3 border-2" type="text" placeholder="email" name="email" />
                    <input className="w-full p-5 mb-3 border-2" type="text" placeholder="name" name="name" />
                    <input className="w-full p-5 mb-3 border-2" type="password" placeholder="Password" name="password" />
                    <button className="btn bg-blue-800 text-white w-full disabled:cursor-not-allowed" type="submit" disabled={loading}>Register</button>
                    <p className="mt-5">Already have an account? <Link to={'/login'}>login!</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup