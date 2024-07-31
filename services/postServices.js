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

export const getAllPosts = async () => {
    return client.posts.findMany({ include: { author } });
}

export const findPostById = async (postId) => {
    return client.posts.findUnique({ where: { id: postId }, include: { author, comments } })
}

export const updatePostById = async (postId, data) => {
    return client.posts.update({ where: { id: postId }, ...data })
}

export const deletePostById = async (postId) => {

    return await client.posts.delete({ where: { id: postId } })

}