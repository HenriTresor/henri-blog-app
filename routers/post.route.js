import { Router } from "express";
import { createPost, deletePost, getAvailablePosts, getOnePost, putPostById } from "../controllers/Post.controller.js";

const router = Router()

router.post('/', createPost)
router.get('/', getAvailablePosts)
router.get('/:postId', getOnePost)
router.put('/:postId', putPostById)
router.delete('/:postId', deletePost)

export default router