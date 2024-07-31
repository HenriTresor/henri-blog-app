import { Router } from "express";
import { addComment, deleteCommentById, getAllCommentsForPost, getOneCommentById, putCommentById } from "../controllers/Comment.controller.js";

const router = Router()

router.post('/', addComment)
router.get('/:postId', getAllCommentsForPost)
router.get('/comment/:commentId', getOneCommentById)
router.put('/:commentId', putCommentById)
router.delete('/:commentId', deleteCommentById)

export default router