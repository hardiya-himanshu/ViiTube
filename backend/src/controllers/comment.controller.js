import {Comment} from '../models/comment.model.js'
import asyncHandler from '../utils/asyncHandler.util.js'
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';


const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    if (!videoId) {
      throw new ApiError(401, "Video Id is required");
    }
    const {page = 1, limit = 10, sortBy, sortType} = req.query

    const pageNos = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);

    const sortOptions = {};
    sortOptions[sortBy] = sortType === "asc" ? 1 : -1;

    const totalComments = await Comment.countDocuments({ video: videoId });

    const commentsOnVideo = await Comment.find({ video: videoId }).sort(sortOptions).skip((pageNos - 1) * pageLimit).limit(pageLimit);;

    if (!commentsOnVideo) {
      throw new ApiError(404, "There are no comments on the video");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {totalComments, commentsOnVideo},
          "All the comments on the video are fetched successfully"
        )
      );    
})

const addComment = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {content} = req.body
    if (!videoId) {
      throw new ApiError(401, "Video Id is required");
    }
    if (!content) {
      throw new ApiError(401, "Some content is required");
    }

    const ownerId = req.user?._id
    const videoComment = await Comment.create({
      content,
      video:videoId,
      owner:ownerId
    })
    if (!commentOnVideo) {
      throw new ApiError(
        500,
        "Something went wrong while adding comment on the video"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, commentOnVideo, "Comment added on the video"));
})

const updateComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    if (!commentId) {
      throw new ApiError(401, "Comment Id is required");
    }
    const comment = await Comment.findById(commentId)
    if(comment.owner.toString()===req.user?._id.toString()){
      const {updatedContent} = req.body
      if (!updatedContent) {
        throw new ApiError(401, "Some content is required");
      }
      
      const updatedComment = await Comment.findByIdAndUpdate(commentId,
        {
          $set:{
              content:updatedContent,
          },
        },
        {
          new:true
        }
      )

      if (!updatedComment) {
        throw new ApiError(500, "Something went wrong while updating the comment");
      }
      return res
        .status(200)
        .json(new ApiResponse(200, updatedComment, "Comment Updated successfuly"));
    }
    else throw new ApiError(403, "You are not authorized to update this comment on this video")
})

const deleteComment = asyncHandler(async (req, res) => {
  const {commentId} = req.params
  if (!commentId) {
    throw new ApiError(401, "Comment Id is required")
  }
  const comment = await Comment.findById(commentId)
  if(comment.owner.toString()===req.user?._id.toString())
  {
    const deletedComment = await Comment.findByIdAndDelete(commentId)
    if(!deletedComment) throw new ApiError(500, "Something went wrong while deleting the comment")
    
    return res
    .status(200)
    .json(new ApiResponse(200, deletedComment, "Comment deleted successfuly"));
  }
  else throw new ApiError(403, "You are not authorized to delete this comment on this video")

})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
    }