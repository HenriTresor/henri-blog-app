import client from '../config/client.js'


export const createComment = async (comment) => {
    const newComment = await client.comments.create({
        data: { ...comment }
    })

    if (!newComment.id) return false

    return newComment
}

export const retrievePostComments = async (postId) => {
    return client.comments.findMany({ where: { postId } })
}

export const retrieveOneComment = async (commentId) => {
    return client.comments.findFirst({ where: { id: commentId } })
}

export const deleteOneCommentById = async (commentId) => {
    return client.comments.delete({ where: { id: commentId } })
}

export const updateCommentById = async (commentId, content) => {
    return client.comments.update({ where: { id: commentId }, data: { content } })
}