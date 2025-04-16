"use client"
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { Providers } from './reducer/provider'
import { createContext } from 'react'
import { useState } from 'react'
import Play from './comp/Play'
import Head from 'next/head'
import { ThemeProvider } from "@/components/theme-provider"

export const song_play = createContext()
export default function RootLayout({ children,pageProps }) {
  const [play_song, setplay_song] = useState("")
  console.log(play_song);
  return (
    <html lang="en">
      <Head>
        <title>Song app</title>
      </Head>
      <body  suppressHydrationWarning={true} className={inter.className}>
     <Providers>
    <song_play.Provider  value={setplay_song}>
    { (play_song != "")?<Play ke={play_song.id} name={play_song.name} url={play_song.url} m={play_song.link}/>:""}
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
    </song_play.Provider>
     </Providers>

      </body>
    </html>
  )
}

