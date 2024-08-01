import { Router } from "express";
import { createPost, deletePost, getAvailablePosts, getOnePost, putPostById } from "../controllers/Post.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router()

router.post('/', verifyToken, createPost)
router.get('/', getAvailablePosts)
router.get('/:postId', getOnePost)
router.put('/:postId', verifyToken, putPostById)
router.delete('/:postId', verifyToken, deletePost)

export default router