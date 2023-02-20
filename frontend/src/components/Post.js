function Post({post}) {
    return(
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-10">
        <div className="container bg-white">
            <h3>
                {post.name}
            </h3>
            <h3>
                {post.text}
            </h3>
            <div className="w-10 rounded-full">
                    <img src={post.img} width={200} height={200} />
            </div>
            <textarea className = "bg-grey-500" rows = "1" />
        </div>
        </div>
        </div>
    
    )

}
export default Post