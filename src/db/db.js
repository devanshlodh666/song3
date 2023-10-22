import mongoose from "mongoose"
const db = ()=>{
    try {
        mongoose.connect(process.env.URI,
            {
                dbName:'MusicPlayer'
            }
        )
        // console.log('connected'); 
    } catch (error) {
        console.log(error);
    }
}  
export default db 