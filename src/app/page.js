"use client"
import 'remixicon/fonts/remixicon.css'
import Bod from "./component/Bod"
import { useState} from 'react'
import { useSession } from 'next-auth/react';
import { useDispatch} from 'react-redux'
import { addSong,addImg } from './reducer/slice'
import song from './data/song';
export default function Home() { 
  // const [son, setson] = useState([]);
  const [img, setimg] = useState("")
  const dispatch = useDispatch(); 
   let {status,data:session} =  useSession()
    if (status === 'authenticated') {
      if (img  === "") {  
    setimg(session?.user);
    fetch(`api/${session?.user?.email}`).then(a=>a.json())
    .then(a=>{
      dispatch(addSong(a.like))
      dispatch(addImg(a.img))
    })  
      }  
    }
    // useEffect(() => {
    // fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/song`).then(a=>a.json())
    // .then(a=>{
    //   setson(a)
    // }) 
    // }, [])
    

  return ( 
    <>      
    <Bod song={song}/>   
    </> 
  ) 
}    