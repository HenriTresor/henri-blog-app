/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from '../components/Loader'
import { useState, useEffect, useContext, FormEvent, useRef } from 'react'
import api from '../utils/api.ts'
import Comment from '../components/Comment.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider.tsx'
import toast from 'react-hot-toast'
import { ArrowLeft, Edit, MessageCircle, PersonStanding, Timer, Trash } from 'lucide-react'


const SinglePost = () => {

    const navigate = useNavigate()
    const form = useRef<any>()
    const { authenticated, user } = useContext(AuthContext)
    const [makingChanges, setMakingChanges] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [commentContent, setCommentContent] = useState('')
    const [post, setPost] = useState({
        id: "",
        author: {
            name: "",
            id: ""
        },
        content: "",
        title: "",
        comments: [],
        createdAt: "",
        authorId: ""
    })
    const [loading, setLoading] = useState(true)
    const { postId } = useParams()

    const getPostData = async () => {
        try {

            const res = await api.server.GET(`/posts/${postId}`)
            const data = await res.json()
            if (!data.status) return console.log('error occured:', data.message)
            setPost(data.post)
            console.log(data)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log('error getting posts', error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPostData()
    }, [])

    const handleAddComment = async () => {
        setMakingChanges(true)
        try {

            const res = await api.server.POST(`/comments`, { postId, content: commentContent, authorId: user?.id })
            const data = await res.json()
            if (!data.status) return toast.error(data.message)
            console.log(data)
            toast.success("Comment addded successfully")
            post.comments = post.comments.map(comment => comment).concat(data.comment);
            setCommentContent('')
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setMakingChanges(false)
        }
    }

    const handleDelete = async () => {
        setMakingChanges(true)
        try {
            const res = await api.server.DELETE(`/posts/${post.id}`)
            const data = await res.json()
            if (!data.status) return toast.error(data.message)
            setIsEditing(false)
            toast.success("post deleted successfully")
            setTimeout(() => {
                window.location.href = '/'
            }, 1000)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setMakingChanges(false)
        }
    }
    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMakingChanges(true)
        try {
            const formData = new FormData(form.current)
            const title = formData.get('title')
            const content = formData.get('content')
            const res = await api.server.PUT(`/posts/${post.id}`, { data: { title, content } })
            const data = await res.json()
            if (!data.status) return toast.error(data.message)
            setIsEditing(false)
            toast.success(data.message)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setMakingChanges(false)
        }
    }
    return (
        <div className="w-full flex items-center justify-center">

            {
                loading && <Loader />
            }

            {
                !post.id && (
                    <div className='flex p-5 '>
                        <button disabled={makingChanges} onClick={() => navigate('/')}>
                            <ArrowLeft />
                        </button>
                        <p className='p-5 text-center text-[1.2rem]'>Post Not found.</p>
                    </div>
                )
            }

            {
                post?.id !== "" && (
                    <div className="w-[70%]  p-5 mt-5">
                        {
                            !isEditing ? (
                                <>
                                    <div className='flex items-center gap-5 justify-between'>
                                        <div>
                                            <button disabled={makingChanges} onClick={() => navigate('/')}>
                                                <ArrowLeft />
                                            </button>
                                            <h1 className={"text-[1.5rem] capitalize font-bold text-gray-700 "}>{post.title}</h1>
                                        </div>
                                        {
                                            post.authorId === user?.id ? (
                                                <div className='flex gap-4'>
                                                    <button disabled={makingChanges} className='disabled:cursor-not-allowed disabled:bg-gray-600' onClick={() => setIsEditing(true)}>
                                                        <Edit />
                                                    </button>

                                                    <button disabled={makingChanges} className='text-red-700 disabled:cursor-not-allowed disabled:bg-gray-600' onClick={() => handleDelete()}>
                                                        <Trash />
                                                    </button>
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                    <p className="text-[1rem] p-5">{post.content}</p>
                                    <div className="flex items-center gap-5">
                                        <p className="flex items-center gap-2"><PersonStanding /> <span className="font-bold">{post.author?.name}</span></p>
                                        <p className="flex items-center gap-2"><Timer /> <span className="font-bold">{new Date(post.createdAt).toLocaleDateString()}</span></p>
                                        <p className="flex items-center gap-2"><MessageCircle /> <span className="font-bold">{post.comments.length}</span></p>
                                    </div>
                                </>
                            ) : (
                                <form ref={form} className="flex flex-col w-[70%] gap-4" onSubmit={(e) => handleUpdate(e)}>
                                    <input className="w-full p-5 mb-3 border-2" value={post.title} onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))} type="text" placeholder="Title" name="title" />
                                    <textarea cols={10} rows={5} className="w-full p-2 border" name="content" placeholder="Add Content..." value={post.content} onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}></textarea>
                                    <button className="btn bg-blue-800 text-white w-full disabled:cursor-not-allowed" disabled={makingChanges}>Update</button>
                                </form>
                            )
                        }



                        <div className="w-full mt-5">
                            <textarea name='content' value={commentContent} onChange={(e) => setCommentContent(e.target.value)} cols={50} rows={2} className="w-full border-2 p-2" placeholder="Add Comment ...">

                            </textarea>
                            <button className="btn bg-blue-600 text-white disabled:bg-gray-600 disabled:cursor-not-allowed" disabled={!authenticated || makingChanges || commentContent === ""} onClick={() => handleAddComment()}>
                                Add Comment
                            </button>
                            {
                                !authenticated && <p>Login to Comment!</p>
                            }
                        </div>

                        <div className="w-full border-4 mt-5 p-5 flex gap-4 flex-col ">
                            <h1>Comments ({post.comments.length})</h1>

                            {
                                post.comments.map((comment: { createdAt: Date }) => (
                                    <Comment {...comment} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default SinglePost