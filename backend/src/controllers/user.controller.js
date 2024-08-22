import asyncHandler from '../utils/asyncHandler.util.js'
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';
import {User} from '../models/user.model.js'
import uploadOnCloudinary from '../utils/cloudinary.util.js'


const registerUser = asyncHandler(async(req, res)=>{
    // get user details
    // validation on provided details
    // check if user already exists
    // check for images and avatar
    // upload them to cloudinary
    // create user object - create entry in db
    // remove  password and refresh token field from response
    // check for user creation 
    // return response

    const {userName, email, fullName, password} = req.body

    if([fullName, userName, email, password].some((field)=>field?.trim()==="")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({$or:[{userName}, {email}]})
    if(existedUser) throw new ApiError(409, "User with email or username already exists")
    
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if(!avatarLocalPath) throw new ApiError(400, "Avatar file is required")
    

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar) throw new ApiError(400, "Avatar file is required")

    const user = await User.create({
        userName:userName.toLowerCase(),
        fullName,
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url||""
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) throw new ApiError(500, "Something went wrong while registering the user")
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})

export default registerUser