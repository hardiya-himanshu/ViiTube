import asyncHandler from '../utils/asyncHandler.util.js'
import ApiError from '../utils/apiError.util.js';
import ApiResponse from '../utils/apiResponse.util.js';
import {User} from '../models/user.model.js'
import uploadOnCloudinary from '../utils/cloudinary.util.js'

const generateAccessAndRefreshToken = async(userId)=>{
    try 
    {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken, refreshToken, user}
    }
    catch (error) 
    {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

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

    const existedUser = await User.findOne({$or:[{userName}, {email}]})
    if(existedUser) throw new ApiError(409, "User with email or username already exists")
    
    // console.log(req.files);
    
    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path
    if(!avatarLocalPath) throw new ApiError(400, "Avatar file is required")
    let coverImageLocalPath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0) coverImageLocalPath = req.files.coverImage[0].path
    

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

const loginUser = asyncHandler(async(req, res)=>{
    // collect data from req.body
    // email or username based authentication
    // find user in database
    // password check
    // access and refresh token generation
    // send cookies

    const {userName, email, password} = req.body
    if(!userName || !email) throw new ApiError(400, "Username or email is required")

    const user = await User.findOne({
        $or:[{userName}, {email}]
    })

    if(!user) throw new ApiError(404, "User does not exist")
    
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid) throw new ApiError(401, "Invalid user credentials")

    const {accessToken, refreshToken, newUser} = await generateAccessAndRefreshToken(user._id)

    user = newUser.select("-password -refreshToken")

    const options = {httpOnly:true, secure:true}
    return res.status(201).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, {user:user, accessToken, refreshToken}, "User Logged In Successfully"))
})

const logoutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(req.user._id, {
        $set:{
            refreshToken:undefined
        },
    },
    {
        new:true
    })

    const options = {httpOnly:true, secure:true}

    return res.status(201).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200), {}, "User Logged Out Successfully")
})

export {registerUser, loginUser, logoutUser}