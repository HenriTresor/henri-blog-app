import client from '../config/client.js'

export const createNewPost = async (post) => {
    const newPost = await client.posts.create({
        data: {
            title: post.title,
            authorId: post.authorId,
            content: post.content,
        }
    })

    return newPost
}

export const findPostById = async (postId) => {
    return client.posts.findFirst({ where:{id:postId} })
}

export const deletePostById = async (postId) => {

    return await client.posts.delete({where:{id: postId}})

}