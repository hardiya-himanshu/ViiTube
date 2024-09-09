import {Tweet} from "../models/tweet.model.js"
import {TweetPost} from "../models/tweet-post.model.js"
import { User } from "../models/user.model.js";
import asyncHandler from '../utils/asyncHandler.util.js'
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const user = await User.findById(req.user?._id).select("-password");
    if (!user) throw new ApiError(404, "User not found")
    
    const tweets = await Tweet.find({ owner: user?._id });
    if (!tweets) {
        throw new ApiError(401, "There are no tweets for this user");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, tweets, "All tweets are fetched"));
})

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {tweetPostId} = req.params
    if (!tweetPostId) throw new ApiError(404, "Tweet-Post-Id is required to make tweet")

    const {tweetContent} = req.body
    if (!tweetContent) throw new ApiError(404, "Tweet Content is required")

    const user = await User.findById(req.user?._id).select("userName avatar");
    if (!user) throw new ApiError(404, "User not found")

    const tweet = await Tweet.create({
        tweetPost: tweetPostId,
        content : tweetContent,
        owner: user
    })

    if(!tweet) throw new ApiError(500, "Something went wrong while creating the tweet")

    return res.status(200).json(new ApiResponse(200, tweet, "Tweet created"));
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {tweetId} = req.params
    if (!tweetId) throw new ApiError(404, "Tweet Id is required")
    
    const tweet = await Tweet.findById(tweetId)
    if(tweet.owner.toString()===req.user?._id.toString()){
        const {updatedContent} = req.body
        if (!updatedContent) {
            throw new ApiError(401, "Some content is required");
        }
        
        const updatedTweet = await Tweet.findByIdAndUpdate(tweetId,
        {
            $set:{
                content:updatedContent,
            },
        },
        {
            new:true
        }
        )

        if (!updatedTweet) {
        throw new ApiError(500, "Something went wrong while updating the tweet");
        }
        return res
        .status(200)
        .json(new ApiResponse(200, updatedTweet, "Tweet Updated successfuly"));
    }
    else throw new ApiError(403, "You are not authorized to update this tweet on this tweet-post")

})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const {tweetId} = req.params
    if (!tweetId) {
        throw new ApiError(401, "Tweet Id is required")
    }
    const tweet = await Tweet.findById(tweetId)
    if(tweet.owner.toString()===req.user?._id.toString())
    {
        const deletedComment = await Tweet.findByIdAndDelete(tweetId)
        if(!deletedComment) throw new ApiError(500, "Something went wrong while deleting the tweet")
        
        return res
        .status(200)
        .json(new ApiResponse(200, deletedComment, "Tweet deleted successfuly"));
    }
    else throw new ApiError(403, "You are not authorized to delete this tweet on this tweet-post")
})

export {
    getUserTweets,
    createTweet,
    updateTweet,
    deleteTweet
}