"use client"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useSession } from "next-auth/react";
import { addSong,addImg } from "../reducer/slice";
import { memo } from "react";
function Comp(props) {
  const like = useSelector(like=>like.songs)
  console.log(like);
  const dispatch = useDispatch();
  let {status,data:session} =  useSession();
  const [hasLike, sethasLike] = useState(true)
  if (like.length != 0) {
    like.map((v)=>{
      if (v.name === props.name  && hasLike === true){
        sethasLike(false)
      }
      
    })
  }
 
  const a = async ()=>{
   if (session) {
    await fetch('/api',{
      method:'PUT',
      headers:{"content-type":"application/json"},
      body:JSON.stringify({
            email:session?.user?.email,    
            id:props.ke,
            type:props.type,
            name:props.name,
            url:props.url, 
            link:props.link 
      })
    })

    fetch(`api/${session?.user?.email}`).then(a=>a.json())
    .then(a=>{
      dispatch(addSong(a.like))
      dispatch(addImg(a.img))
    })   
   }
   if (like.length != 0) {
    like.map((v)=>{
      if (v.name !== props.name && hasLike === "heart-red.svg"){
        sethasLike("like.svg")
      } 
    })
    
  }
  } 
  
  return(
        <> 
            <div id={props.key} key={props.ke}  className="comp">
          
            <div id={props.key} onClick={props.onClick} className="comp_img">    
              <img id={props.key} src={props.url} alt="." />
            </div>  
            <div id={props.key}  className="song_name">
             <h1 id={props.key} onClick={props.onClick}>{props.name}</h1>
             <div className="option">
              <img onClick={()=>{a()}} src={hasLike?"like.svg":"heart-red.svg"} alt="" />
            </div>                 
            
            </div>
            </div>
        </>
    )
}    


export default memo(Comp)