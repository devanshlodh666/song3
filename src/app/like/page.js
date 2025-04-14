"use client"
import Body from "../component/Bod"
import { useSelector,useDispatch } from "react-redux"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { addImg, addSong } from "../reducer/slice"

const page = () => {
  const [img, setimg] = useState("");
  const dispatch = useDispatch();
  const  dat = useSelector(a=>a.songs);
  const {status,data:session} = useSession();
  if (status === 'authenticated') { 
    if (img === "") {
      setimg(session?.user?.image)
      fetch(`api/${session?.user?.email}`).then(a=>a.json())
    .then(a=>{
      dispatch(addSong(a.like));
      dispatch(addImg(a.img));
    }) 
    } 
  }
    return (
    <>
        <Body
            song={dat}     
        />
    </> 
  )

}
export default page