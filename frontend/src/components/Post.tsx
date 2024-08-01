import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider"
import { MessageCircle, PersonStanding, Timer } from "lucide-react"

type Props = {
    title?: string,
    content?: string,
    createdAt: Date,
    author?: {
        name: string
    },
    numberOfComments?: number,
    id?: string,
    authorId?: string
}

function Post({ author, content, createdAt, title, numberOfComments, id, authorId }: Props) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div className="w-full  cursor-pointer p-5 border mt-5" onClick={() => navigate(`/posts/${id}`)}>
            <div className="w-full flex items-center justify-between">
                <h1 className={"text-[1.5rem] capitalize font-bold text-gray-700 "}>{title}</h1>
                {
                    authorId === user?.id ? (
                        <p>owner</p>
                    ) : null
                }
            </div>
            <p className="text-[1rem] p-5">{content && content?.length > 100 ? <> {content.slice(0,200)} <span className="text-blue-700"> ... read more</span></> : content}</p>
            <div className="flex items-center gap-5">
                <p className="flex items-center gap-2"><PersonStanding /> <span className="font-bold">{author?.name}</span></p>
                <p className="flex items-center gap-2"><Timer /> <span className="font-bold">{new Date(createdAt).toLocaleDateString()}</span></p>
                <p className="flex items-center gap-2"><MessageCircle /> <span className="font-bold">{numberOfComments}</span></p>
            </div>
        </div>
    )
}

export default Post