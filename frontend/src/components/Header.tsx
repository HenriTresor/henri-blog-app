function Header() {
    return (
        <div className="w-full p-3 flex items-center justify-around bg-blue-800 text-white font-bold sticky top-0">
            <h1>Blog</h1>
            <div className="w-auto flex gap-5">
                <button className="btn bg-white border border-white text-blue-800">Add Post</button>
                <button className="btn bg-white border border-red-600 text-red-600">Logout</button>
            </div>
        </div>
    )
}

export default Header