import { connectDB } from "@/lib/databaseConnection"
import Video, { VideoSchemaType } from "@/Schema/Video.Schema"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET=async()=>{
    try{
        await connectDB()
        const allVideos=await Video.find({}).sort({createdAt:-1}).lean()
        if(!allVideos || allVideos.length===0){
            return NextResponse.json({message:"No videos found", data:[]}, {status:404})
        }
        return NextResponse.json({message:"Videos get Successfully", data:allVideos}, {status:200})
    }catch(e){
        return NextResponse.json({message:"Something went wrong"}, {status:500})
    }
}


export const POST=async(request:Request)=>{
    const {title,description,thumbnailUrl,control,transformation,videoUrl}:VideoSchemaType=await request.json()

    try{
        const session=await getServerSession()
        if(!session){
            return NextResponse.json({message:"Unauthorized"}, {status:401})
        }
        const userId=session.user.id
        await connectDB()
        console.log({title,description,thumbnailUrl,control,transformation,videoUrl})
        if(!title || !description || !thumbnailUrl || !videoUrl){
            return NextResponse.json({message:"All fields are required"}, {status:400})
        }
        const videoData={
            userID:userId,
            title,
            description,
            thumbnailUrl,
            videoUrl,
            control:control??true,
            transformation:{
                height:1920,
                width:1080,
                quality:transformation?.quality ?? 100
            }
        }
        const newVideo=await Video.create(videoData)
        return NextResponse.json({message:"Video created successfully", data:newVideo}, {status:201})
    }catch(e){
        return NextResponse.json({error:"Something went wrong", msg:e},{status:500})
    }
}