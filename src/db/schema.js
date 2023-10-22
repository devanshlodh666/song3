import mongoose from "mongoose";
const likeSchema = mongoose.Schema({
        email:{
            type:String,
            required:true,
            unique:true
        },
        img:String,
        like:[
            {
                id:{
                    type:Number,
                    required:true
                },
                type:{
                    type:String,
                    required:true
                },
                name:{
                        type:String,
                        required:true
                    },
                url:{
                    type:String,
                    required:true
                },
                link:{
                    type:String,
                    required:true
                }
    }] 
    });


const songSchema = new mongoose.Schema({
    details:String,
    songs:[
        {
        id:{
            type:Number,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        name:{
                type:String,
                required:true
            },
        url:{
            type:String,
            required:true
        },
        link:{
            type:String,
            required:true
        }     
        }
    ]
})
export const Songs = mongoose.models.songs || mongoose.model('songs',songSchema);
export const like =  mongoose.models.like  ||  mongoose.model('like',likeSchema) ;       