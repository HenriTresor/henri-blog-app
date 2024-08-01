import { useEffect, useState } from "react"
import api from "../utils/api"
import Post from "../components/Post"
import Loader from "../components/Loader"

function Posts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const getPosts = async () => {

        try {

            const res = await api.server.GET(`/posts`)
            const data = await res.json()
            if (!data.status) return console.log('error occured:', data.message)
            setPosts(data.posts)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log('error getting posts', error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className="w-full p-5 flex items-center justify-center">
            <div className="w-1/2 p-2">
                <h1>Read ...</h1>

                <div className="w-full flex flex-col gap-5">
                    {
                        loading && (
                            <Loader />
                        )
                    }
                    {
                        posts.map((post: { createdAt: Date }) => (
                            <Post {...post} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Posts