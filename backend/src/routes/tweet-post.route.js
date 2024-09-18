import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js'
import {
    createTweetPost,
    getTweetPostById,
    updateTweetPost,
    deleteTweetPost,
    getUserTweetPosts
} from "../controllers/tweet-post.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT);

router.route("/").post(upload.single("tweetPostFile"),createTweetPost)
router
    .route("/:tweetPostId")
    .get(getTweetPostById)
    .patch(updateTweetPost)
    .delete(deleteTweetPost);
router.route("/user/:userId").get(getUserTweetPosts);

export default router