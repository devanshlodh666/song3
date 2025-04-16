// import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "../../components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Authentication App",
  description: "A modern authentication application with Next.js",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


// "use client"
// import { signOut, useSession } from "next-auth/react";
//  const page = () => {
//     const {data}  = useSession();
//     console.log(data);

//   return (
//     <>
//       {/* <button onClick={}>dsdsds</button> */}
//       <button onClick={()=>signOut('google')}>Logout</button>

//     </>
//   )
// }   
// export default page   