import { Router } from "express";
import { createPost, deletePost } from "../controllers/Post.controller.js";

const router = Router()

router.post('/', createPost)
router.delete('/:postId', deletePost)

export default router