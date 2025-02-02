import mongoose, { mongo } from "mongoose";

const MONGO_URI=process.env.MONGODB_URI!

if (!MONGO_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env file ")
}

let cached = global.mongoose

if (!cached){
    cached=global.mongoose={conn:null,promise:null}
}

export async function connectDB (){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
       const opts = {
        bufferCommands: true,
        maxPoolSize:10
       }

       cached.promise=mongoose.connect(MONGO_URI, opts)
       .then(() => mongoose.connection)
    }

    try{
        cached.conn=await cached.promise
    }catch(e){
        cached.promise=null
        throw e
    }
    return cached.conn

}
