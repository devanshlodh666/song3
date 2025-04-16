"use client"
import 'remixicon/fonts/remixicon.css'
import Bod from "./comp/Bod"
import { useState} from 'react'
import { useSession } from 'next-auth/react';
import { useDispatch} from 'react-redux'
import { addSong,addImg,addEmail1 } from './reducer/slice'
import { useSelector } from 'react-redux';
import song from './data/song'; 
import { useEffect } from 'react';

export default function Home() { 
  const data = useSelector((data)=>data.S); 
  let email1 = useSelector(data=>data.email1);
  console.log("email1",email1);
  
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
      console.log("a",a.img!==null?a.img:"acca.svg")
      dispatch(addEmail1(session?.user?.email))
      dispatch(addSong(a.like))
      dispatch(addImg(a.img!==null?a.img:"acca.svg"))
    })  
      }  
    }
    // useEffect(() => {
    //   let usr = localStorage.getItem("user");
    //   console.log(usr);
      
    //   if (usr) {
    //     fetch(`api/${usr.email}`).then(a=>a.json())
    // .then(a=>{
    //   console.log("a",a.img!==null?a.img:"acca.svg");
      
    //   dispatch(addSong(a.like))
    //   dispatch(addImg(a.img!==null?a.img:"acca.svg"))
    // })  
    //   }
    // }, [])
    useEffect(() => {
      // Get user from localStorage
      let storedUser = localStorage.getItem("user");
  
      if (!storedUser) return;
      
      try {
        const usr = JSON.parse(storedUser); // ✅ Convert string to object
        if (!usr?.email) return;
  
        fetch(`/api/${usr.email}`)
          .then((res) => {
            if (!res.ok) throw new Error("API Error");
            return res.json();
          })
          .then((data) => {
            console.log("Fetched data:", data);
            dispatch(addEmail1(data?.email))
            dispatch(addSong(data?.like || []));
            dispatch(addImg(data?.img ? data.img : "acca.svg"));
          })
          .catch((err) => {
            console.error("API Error:", err);
            // toast.error("User data fetch failed", {
            //   position: "bottom-right",
            //   autoClose: 5000,
            //   theme: "light",
            //   transition: Slide,
            // });
          });
      } catch (err) {
        console.error("Invalid user in localStorage", err);
      }
    }, []);
  return ( 
    <>      
    <Bod song={song}/> 
    </> 
  ) 
}    