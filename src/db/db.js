import mongoose from "mongoose"
const db = ()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI,
            {
                dbName:'MusicPlayer'
            }
        )
        // das console.log('connected'); 
    } catch (error) {
        console.log(error);
    }
}   
export default db 