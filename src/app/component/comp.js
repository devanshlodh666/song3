"use client"
import { useDispatch } from "react-redux"
import { useSession } from "next-auth/react";
import { addSong,addImg,addS } from "../reducer/slice";
import { memo } from "react";
function Comp(props) {
  const dispatch = useDispatch();
  let {status,data:session} =  useSession();
  const a = async ()=>{
    console.log("dasdas");
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
              <img onClick={a} src="like.svg" alt="" />
            </div>                 
            
            </div>
            </div>
        </>
    )
}    


export default memo(Comp)