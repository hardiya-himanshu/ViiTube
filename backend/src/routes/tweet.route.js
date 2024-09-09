import { Router } from 'express';
import {
    getUserTweets,
    createTweet,
    updateTweet,
    deleteTweet,
} from "../controllers/tweet.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); 

router.route("/user/:userId").get(getUserTweets);
router.route("/tweet-post/:tweetPostId").post(createTweet);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router