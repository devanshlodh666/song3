import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'


export const authOptions = {
    providers:[                  
        GoogleProvider({                
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        })
    ],
    
    secret: process.env.SECRET
}
const handeler =  NextAuth(authOptions)
export {handeler as GET, handeler as POST}