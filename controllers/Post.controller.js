import expressAsyncHandler from "express-async-handler";
import postValidObject from "../validators/Post.joi.js";
import client from '../config/client.js'
import { createNewPost, deletePostById, findPostById, getAllPosts, updatePostById } from "../services/postServices.js";

export const createPost = expressAsyncHandler(async (req, res, next) => {
    let { title, authorId, content } = req.body

    let { error, value } = postValidObject.validate({ title, authorId, content })
    if (error) return next(new Error(error.details[0].message))

    let newPost = await createNewPost(value)
    if (!newPost.id) return next(new Error("error saving post. try again"))
    res.status(201).json(
        {
            status: true,
            post: newPost
        })
})

export const deletePost = expressAsyncHandler(async (req, res, next) => {
    let { postId } = req.params
    const postExists = await findPostById(postId)
    console.log(postExists)
    if (!postExists) return next(new Error("post does not exists"))
    await deletePostById(postId)
    res.status(200).json({
        status: true,
        message: "post deleted successfully"
    })
})

export const getOnePost = expressAsyncHandler(async (req, res, next) => {
    let { postId } = req.params
    const postExists = await findPostById(postId)
    console.log(postExists)
    if (!postExists) return next(new Error("post does not exists"))
    res.status(200).json({
        status: true,
        post: postExists
    })
})

export const getAvailablePosts = expressAsyncHandler(async (req, res, next) => {
    const posts = await getAllPosts()
    return res.status(200).json({
        status: true,
        posts
    })
})

export const putPostById = expressAsyncHandler(async (req, res, next) => {
    const { postId } = req.params
    const data = req.body
    const postExists = await findPostById(postId)
    console.log(postExists)
    if (!postExists) return next(new Error("post does not exists"))

    const result = await updatePostById(postId, data)
    res.status(200).json({
        status: true,
        message: "post updated successfully"
    })
})