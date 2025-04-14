"use client"
import 'remixicon/fonts/remixicon.css'
import Bod from "./component/Bod"
import { useState} from 'react'
import { useSession } from 'next-auth/react';
import { useDispatch} from 'react-redux'
import { addSong,addImg } from './reducer/slice'
import { useSelector } from 'react-redux';
import song from './data/song'; 
export default function Home() { 
  const data = useSelector((data)=>data.S); 
  // const [son, setson] = useState([]);
  const [img, setimg] = useState("")
  const dispatch = useDispatch(); 
   let {status,data:session} =  useSession()
    if (status === 'authenticated') {
      if (img  === "") {  
        console.log(session);
        
    setimg(session?.user);
    // setimg(session?.user || "");
    fetch(`api/${session?.user?.email}`).then(a=>a.json())
    .then(a=>{
      console.log("a",a.img);
      
      dispatch(addSong(a.like))
      dispatch(addImg(a.img))
    })  
      }  
    }
  return ( 
    <>      
    <Bod song={song}/> 
    </> 
  ) 
}    