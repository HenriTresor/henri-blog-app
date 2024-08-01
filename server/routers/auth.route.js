import { Router } from "express";
import { login } from "../controllers/Auth.controller.js";
import { createUser } from "../controllers/User.controller.js";

const router = Router()

router.post('/login', login)
router.post('/register', createUser)

export default router