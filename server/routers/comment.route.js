import { Router } from "express";
import { addComment, deleteCommentById, getAllCommentsForPost, getOneCommentById, putCommentById } from "../controllers/Comment.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router()

router.post('/', verifyToken, addComment)
router.get('/:postId', verifyToken, getAllCommentsForPost)
router.get('/comment/:commentId', verifyToken, getOneCommentById)
router.put('/:commentId', verifyToken, putCommentById)
router.delete('/:commentId', verifyToken, deleteCommentById)

export default router