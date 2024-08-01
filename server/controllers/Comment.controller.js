import expressAsyncHandler from 'express-async-handler'
import client from '../config/client.js'
import commentValidObject from '../validators/Comment.joi.js'
import { createComment, deleteOneCommentById, retrieveOneComment, retrievePostComments, updateCommentById } from '../services/commentServices.js'
import { findUserById } from '../services/userServices.js'

export const addComment = expressAsyncHandler(async (req, res, next) => {
    let { postId, authorId, content } = req.body
    const { error, value } = commentValidObject.validate({ postId, authorId, content })

    if (error) return next(new Error(error.details[0].message))

    const newComment = await createComment({ postId, authorId, content })
    if (!newComment) return next(new Error("comment not saved"))

    let author = await findUserById(authorId)
    console.log(author)
    res.status(201).json({
        status: true,
        message: 'comment saved',
        comment: { ...newComment, author }
    })
})

export const putCommentById = expressAsyncHandler(async (req, res, next) => {
    const { commentId } = req.params
    const { content } = req.body
    const comment = await retrieveOneComment(commentId)
    if (!comment) return next(new Error("comment not found"))
    await updateCommentById(commentId, content)
    res.status(200).json({
        status: true,
        message: "comment updated successfully"
    })
})
export const deleteCommentById = expressAsyncHandler(async (req, res, next) => {
    const { commentId } = req.params
    const comment = await retrieveOneComment(commentId)
    if (!comment) return next(new Error("comment not found"))
    await deleteOneCommentById(commentId)
    res.status(200).json({
        status: true,
        message: "comment deleted successfully"
    })
})
export const getAllCommentsForPost = expressAsyncHandler(async (req, res, next) => {
    const { postId } = req.params
    const comments = await retrievePostComments(postId)
    res.status(200).json({
        status: true,
        comments
    })
})
export const getOneCommentById = expressAsyncHandler(async (req, res, next) => {
    const { commentId } = req.params
    const comment = await retrieveOneComment(commentId)
    res.status(200).json({
        status: true,
        comment
    })
})