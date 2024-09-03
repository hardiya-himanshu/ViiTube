import {Schema, model} from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const commentScheme = new Schema(
    {
        content:{
            type:"String",
            required:true
        },
        video:{
            type:Schema.Types.ObjectId,
            ref:"Video",
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },
    {
        timestamps:true
    }
)

commentScheme.plugin(mongooseAggregatePaginate)

export const Comment = model("Comment", commentScheme)