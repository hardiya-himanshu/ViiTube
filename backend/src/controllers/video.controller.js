import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from '../models/user.model.js'
import asyncHandler from '../utils/asyncHandler.util.js'
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';
import {uploadOnCloudinary} from '../utils/cloudinary.util.js'

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    const pageNos = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);

    // match query with title of videos
    const searchQuery = query?{title:{$regex:query, $options:"i"}}:{}

    // userId in searchQuery
    if(userId) searchQuery.userId = userId

    // sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortType === "asc" ? 1 : -1;

    // Get total document count for pagination
    const totalVideos = await Video.countDocuments(searchQuery);

    // Fetch videos from the database
    const videos = await Video.find(searchQuery)
        .sort(sortOptions)
        .skip((pageNos - 1) * pageLimit)
        .limit(pageLimit);

    // Return results
    res.json(new ApiResponse(
        200, 
        {
            totalVideos,
            totalPages: Math.ceil(totalVideos / pageLimit),
            currentPage: pageNos,
            videos,
        },
        "All videos fetched successfully"
    ));

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    const user = await User.findById(req.user?._id).select("-email -password -coverImage -watchHistory -refreshToken")

    // TODO: get video, upload to cloudinary, create video
    if([title, description].some((field)=>field?.trim()==="")){
        throw new ApiError(400, "Fields is/are missing")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path
    if(!videoLocalPath) throw new ApiError(400, "Video file is required")
    let thumbnailLocalPath
    if(req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length>0) thumbnailLocalPath = req.files.thumbnail[0].path
    

    const video = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    if(!video) throw new ApiError(400, "Video file is required")
    if(!thumbnail) throw new ApiError(400, "Thumbnail file is required")

    const newVideo = await Video.create({
        videoFile:video?.video.duration,
        thumbnail:thumbnail?.url,
        title,
        description,
        duration:video?.duration,
        views,
        isPublished,
        owner:user
    })
    const newCreatedVideo = await Video.findById(newVideo._id)

    if(!newCreatedVideo) throw new ApiError(500, "Something went wrong while publishing the video")
    
    return res.status(201).json(
        new ApiResponse(201, newCreatedVideo, "Video Published Successfully")
    )    

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    if(!videoId?.trim()) throw new ApiError(400, "VideoId is missing")
    
    const video = await Video.findById(videoId)
    if (!video) throw new ApiError(400, "Video does not exist")

    return res.status(200).json(
        new ApiResponse(200, video, "Video details fetched successfully")
    )

})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId?.trim()) throw new ApiError(400, "VideoId is missing")

    const video = await Video.findById(videoId)
    if(video.owner._id===req.user?._id)
    {
        const { title, description } = req.body
        if(!title || !description){
            throw new ApiError(400, "Mandatory fields are Empty")
        }
    
        const newThumbnailLocalPath  = req.file?.path
        if(!newThumbnailLocalPath) throw new ApiError(400, "Thumbnail file is required")

        const newThumbnail = await uploadOnCloudinary(newThumbnailLocalPath)
        if(!newThumbnail?.url) throw new ApiError(400, "Error while uploading on new thumbnail")

        const previousThumbnail = video.thumbnail

        //TODO: update video details like title, description, thumbnail
        const updatedVideo = await Video.findByIdAndUpdate(videoId,
            {
            $set:{
                title,
                description,
                thumbnail:newThumbnail?.url
                }
            },
            {
                new:true
            }
        )

        if(previousThumbnail){
            await deleteCloudinaryFile(previousThumbnail)
        } 

        return res.status(200).json(new ApiResponse(200, updatedVideo, "Video updated successfully"))
    }            
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId?.trim()) throw new ApiError(400, "VideoId is missing")
        
    //TODO: delete video
    const video = await Video.findById(videoId)
    if(video.owner._id===req.user?._id)
    {
        await Video.findByIdAndDelete(videoId)

        return res.status(200).json(new ApiResponse(200, {}, "Video deleted successfully"))
    }      

})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId?.trim()) throw new ApiError(400, "VideoId is missing")

    const video = await Video.findById(videoId)
    if(video.owner._id===req.user?._id)
    {       
        await Video.findByIdAndUpdate(videoId,
            {
            $set:{
                    isPublished: !isPublished
                }
            },
            {
                new:true
            }
        )

        return res.status(200).json(new ApiResponse(200, {}, "Video publish status toggled successfully"))
    }
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}