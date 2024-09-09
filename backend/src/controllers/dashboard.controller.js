import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { TweetPost } from "../models/tweet-post.model.js";
import { Tweet } from "../models/tweet.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import asyncHandler from '../utils/asyncHandler.util.js'
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const { userId } = req.params;
    if (!userId) throw new ApiError(401, "User Id is required");

    const totalViews = await Video.aggregate([
        {
          $match: { owner: new mongoose.Types.ObjectId(userId) } // Match videos owned by the user
        },
        {
          $group: {
            _id: null, 
            totalViews: { $sum: "$views" } 
          }
        }
      ]);

    const allVideos = await Video.find({ owner: userId });
    if (!allVideos || allVideos.length === 0) {
    throw new ApiError(404, "Something went wrong while fetching user's all videos or user does not have upload any videos");
    }
    const totalVideosCount = await Video.countDocuments({ owner: userId });
    const totalViewsCount = totalViews.length > 0 ? totalViews[0].totalViews : 0;
    const totalSubscribersCount = await Subscription.countDocuments({channel: userId});
    const totalSubscribedToCount = await Subscription.countDocuments({subscriber: userId});
    const totalLikesCount = await Like.countDocuments({ likedBy: userId });
    const totalCommentCount = await Comment.countDocuments({owner: userId});
    const totalTweetPostMadeCount = await TweetPost.countDocuments({owner: userId});
    const totalTweetsCount = await Tweet.countDocuments({owner: userId});
    
    return res.status(200).json(
        new ApiResponse(200, {
            "User's All Videos": allVideos,
            "Total Videos": totalVideosCount,
            "Total Views": totalViewsCount,
            "Total Subscribers": totalSubscribersCount,
            "Total Subscribed To": totalSubscribedToCount,
            "Total Likes by User": totalLikesCount,
            "Total Comment by User": totalCommentCount,
            "Total Tweet-Post by User": totalTweetPostMadeCount,
            "Total Tweets by User": totalTweetsCount,
        }, "All stats data of user is fetched Successfully")
      );
    
})

export {getChannelStats}