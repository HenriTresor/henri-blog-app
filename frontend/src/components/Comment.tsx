
type Props = {
    content?: string,
    createdAt: Date,
    author?: {
        name: string
    },
}

function Comment({ author, content, createdAt  }: Props) {
    return (
        <div className="w-full  cursor-pointer p-5 border mt-5">
            <p><span className="font-bold">{author?.name}</span> on: <span className="font-bold">{new Date(createdAt).toLocaleDateString()}</span></p>
            <p className="text-[1rem] p-5">{content}</p>
        </div>
    )
}

export default Comment