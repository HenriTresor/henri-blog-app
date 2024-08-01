
type Props = {
    title?: string,
    content?: string,
    createdAt: Date,
    author?: {
        name: string
    },
    numberOfComments: number
}

function Post({ author, content, createdAt, title, numberOfComments }: Props) {
    return (
        <div className="w-full  cursor-pointer p-5 border mt-5">
            <h1 className={"text-[1.5rem] capitalize font-bold text-gray-700 "}>{title}</h1>
            <p className="text-[1rem] p-5">{content}</p>
            <div className="flex items-center gap-5">
                <p>created by: <span className="font-bold">{author?.name}</span></p>
                <p>on: <span className="font-bold">{new Date(createdAt).toLocaleDateString()}</span></p>
                <p>comments: <span className="font-bold">{numberOfComments}</span></p>
            </div>
        </div>
    )
}

export default Post