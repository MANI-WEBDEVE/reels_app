import mongoose, { models, Schema } from "mongoose";

export const VIDEO_DIMENSION ={
    width: 1080,
    height: 1920
} as const

export interface VideoSchemaType{
    _id?: mongoose.Types.ObjectId,
    title:string;
    description:string;
    videoUrl:string;
    thumbnailUrl:string;
    control?:boolean;
    transformation?:{
        width:number;
        height:number;
        quality?:number
    };
    userID:string;
    createdAt?:Date;
    updatedAt?:Date
}


const VideoSchema = new mongoose.Schema<VideoSchemaType>({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        min:5,
        max:100
    },
    videoUrl:{
        type:String,
        required:true,
    },
    thumbnailUrl:{
      type:String,
    },
    control:{
        type:Boolean,
        default:true
    },
    transformation:{
        type:{
            height: { type: Number, default: VIDEO_DIMENSION.height },
            width: { type: Number, default: VIDEO_DIMENSION.width },
            quality: { type: Number, min: 1, max: 100 }
        }, 
        required:true
    }
}, {timestamps:true})

const Video = models.Video || mongoose.model<VideoSchemaType>("Video", VideoSchema)

export default Video