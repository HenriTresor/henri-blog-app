/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import api from "../utils/api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
function CreatePost() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const form = useRef<any>(null)
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            window.location.href = '/login'
        }
    },[])
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(form.current)
            const title = formData.get('title')
            const content = formData.get('content')
            const res = await api.server.POST('/posts', { title, content, authorId: user?.id })
            const data = await res.json()
            if (!data.status) return toast.error(data.message)
            navigate(`/posts/${data.post.id}`)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="w-full h-[100dvh] text-center flex justify-center items-center flex-col gap-5">
            <h1 className="text-[1.5rem]">Fill In the Following form to Create your Content!</h1>
            <form ref={form} className="flex flex-col w-[70%] gap-4" onSubmit={(e) => handleSubmit(e)}>
                <input className="w-full p-5 mb-3 border-2" type="text" placeholder="Title" name="title" />
                <textarea cols={10} rows={5} className="w-full p-2 border" name="content" placeholder="Add Content..."></textarea>
                <button className="btn bg-blue-800 text-white w-full disabled:cursor-not-allowed" disabled={loading}>Create</button>
            </form>
        </div>
    )
}

export default CreatePost