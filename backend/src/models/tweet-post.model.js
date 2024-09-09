import { Schema, model } from "mongoose";

const tweetPostSchema = new Schema(
    {
        tweetPostFile:{
            type:String, // cloudinary file url in string
        },
        content:{
            type:String, 
            required:true
        },
        tweets:[
            {
            type:Schema.Types.ObjectId,
            ref:"Tweet"
            }
        ],
        owner:{
            type:Schema.Types.ObjectId, 
            ref:"User"
        },
    },
    {
        timestamps:true
    }
)

export const TweetPost = model("TweetPost", tweetPostSchema)