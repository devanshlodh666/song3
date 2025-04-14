import mongoose from "mongoose"
const db = async ()=>{
    console.log(process.env.MONGODB_URI);
    
    try {
       await mongoose.connect(process.env.MONGODB_URI,
            {
                dbName:'MusicPlayer'
            } 
        )
        console.log("MongoDB connected ✅");

        
        // das console.log('connected'); 
    } catch (error) { 
        console.log(error);
    }
}   
export default db 

// import mongoose from "mongoose";

// const db = async () => {
//     try {
//         console.log("Connecting to MongoDB:", process.env.MONGODB_URI);
//         await mongoose.connect(process.env.MONGODB_URI, {
//             dbName: "MusicPlayer",
//         });
//         console.log("MongoDB connected ✅");
//     } catch (error) {
//         console.error("MongoDB connection error ❌", error);
//     }
// };

// export default db;
