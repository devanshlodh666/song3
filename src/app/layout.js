"use client"
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { Providers } from './reducer/provider'
import { SessionProvider } from 'next-auth/react'
export default function RootLayout({ children,pageProps }) {
  return (
    <html lang="en">

      <body  suppressHydrationWarning={true} className={inter.className}>
     <SessionProvider>
     <Providers>

     {children} 
     </Providers>
     </SessionProvider>

      </body>
    </html>
  )
}
