import {Playlist} from '../models/playlist.model.js'
import asyncHandler from '../utils/asyncHandler.util.js'
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';

const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    if (!name || !description) {
        throw new ApiError(401, "Name and the description are required");
      }
    const user = req.user?._id.select(userName, fullName, avatarImage);

    const playlist = await Playlist.create({
    name,
    description,
    owner: user,
    });
    if (!playlist) {
    throw new ApiError(500, "Something went wrong while creating the playlist");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully"));
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    if (!userId) {
        throw new ApiError(401, "User Id is required to get the playlists");
    }

    const playlists = await Playlist.find({
    owner: userId,
    });
    if (!playlists || playlists.length === 0) {
    throw new ApiError(404, "There are no playlists of this user");
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
        200,
        playlists,
        "All the playlists of the user are fetched"
        )
    );
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if (!playlistId) {
        throw new ApiError(401, "Playlist Id is required to search the playlist");
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
    throw new ApiError(404, "Playlist not found");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched"));
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if (!playlistId || !videoId) {
        throw new ApiError(401, "Enter playlist and video Id to proceed");
    }
    const findPlaylistAndAddVideo = await Playlist.findOneAndUpdate(
    { _id: playlistId },
    {
        $push: {
        videos: videoId,
        },
    },
    {
        new: true,
    }
    );
    if (!findPlaylistAndAddVideo) {
    throw new ApiError(
        500,
        "Something went wrong while adding the video to the playlist"
    );
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
        200,
        findPlaylistAndAddVideo,
        "Video added to playlist successfuly"
        )
    );
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    if (!playlistId || !videoId) {
        throw new ApiError(401, "Enter the playlist and video Id to proceed");
      }
      const deleteVideoFromPLaylist = await Playlist.findOneAndUpdate(
        { _id: playlistId },
        {
          $pull: {
            videos: videoId,
          },
        },
        {
          new: true,
        }
      );
    
      if (!deleteVideoFromPLaylist) {
        throw new ApiError(
          500,
          "Something went wrong while deleting the video from the playlist"
        );
      }
    
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            deleteVideoFromPLaylist,
            "Video deleted from the playlist successfuly"
          )
        );
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if (!playlistId) {
        throw new ApiError(401, "Enter the playlist Id to proceed");
    }
    const deletedPlaylist = await Playlist.findOneAndDelete({ _id: playlistId });
    if (!deletedPlaylist) {
    throw new ApiError(404, "Something went wrong while deleting playlist");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, deletedPlaylist, "Playlist deleted successfuly"));
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    
    if (!playlistId || (!name && !description)) {
        throw new ApiError(
        401,
        "Playlist ID is required, and either name or description must be provided."
        );
    }

    const editedPlaylist = await Playlist.findOneAndUpdate(
        { _id: playlistId },
        {
        $set: {
            name,
            description,
        },
        },
        { new: true }
    );

    if (!editedPlaylist) {
        throw new ApiError(500, "Something went wrong while updating the playlist");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, editedPlaylist, "PLaylist Edited successfuly"));
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}