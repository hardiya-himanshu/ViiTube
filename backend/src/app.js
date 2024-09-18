import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { FRONTEND_URL } from './constants.js'

const app = express()

app.use(cors({
    origin: `${FRONTEND_URL}`, // process.env.CORS_ORIGIN,
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
import dashboardRoutes from "./routes/dashboard.route.js";
import videoRouter from './routes/video.route.js'
import playlistRouter from './routes/playlist.route.js'
import subscriptionRouter from './routes/subscription.route.js'
import likeRouter from './routes/like.route.js'
import commentRouter from './routes/comment.route.js'
import tweetPostRouter from './routes/tweet-post.route.js'
import tweetRouter from './routes/tweet.route.js'

// declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/dashboard", dashboardRoutes)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/playlists", playlistRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/tweet-posts", tweetPostRouter)
app.use("/api/v1/tweets", tweetRouter)

export default app