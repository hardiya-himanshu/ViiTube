import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"5mb"
}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes :

// import
import userRouter from './routes/user.route.js'
import videoRouter from './routes/video.route.js'
import subscriptionRouter from './routes/subscription.route.js'
import likeRouter from './routes/like.route.js'

// declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/subscription", subscriptionRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/comments", commentRouter)

export default app