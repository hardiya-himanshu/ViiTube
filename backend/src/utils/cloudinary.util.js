import {v2 as cloudinary} from 'cloudinary'
import ApiError from './apiError.util.js';
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async(localFilePath) =>{
    try {
        if(!localFilePath) return null
        const uploadResponse = await cloudinary.uploader
        .upload(
           localFilePath, {folder: 'ViiTube'} 
        )
        fs.unlinkSync(localFilePath)
        return uploadResponse
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const extractPublicId = (url) => {
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1]; // e.g., sample.jpg
    const publicId = publicIdWithExtension.split('.')[0]; // e.g., sample
    return publicId;
};

const deleteCloudinaryFile = async(filePublicURL) =>{
    try {
        if(!filePublicURL) throw new ApiError(400, "Required File is Missing")
        const publicId = extractPublicId(filePublicURL)
        
        const fileDeletedResponse =  await cloudinary.uploader.destroy(`ViiTube/`+publicId )
        
        if (fileDeletedResponse.result !== 'ok') {
            throw new ApiError(400, "Failed to delete file from Cloudinary");
        }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting file from cloudinary")
    }
}

export {uploadOnCloudinary, deleteCloudinaryFile}