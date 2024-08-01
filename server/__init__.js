import express from 'express'
import errorHandler from './middlewares/errorHandler.js'
import { config } from 'dotenv'
import cors from 'cors'
import http from 'http'

import authRouter from './routers/auth.route.js'
import postRouter from './routers/post.route.js'
import commentRouter from './routers/comment.route.js'

config()

const app = express()
const PORT = process.env.PORT || 8080
const server = http.createServer(app)
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true
}))
// app.use(express.urlencoded({ extended: false }))
// routes

const root = '/api/v1/'

app.use(`${root}auth`, authRouter)
app.use(`${root}posts`, postRouter)
app.use(`${root}comments`, commentRouter)
app.all('*', (req, res, next) => {
    next(new Error('route not found'))
})


app.use(errorHandler)


server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})