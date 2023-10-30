"use client"
import { memo, useState } from "react"
import Comp from "./comp"
import Nave from "./Nave"
import Foot from "./Foot"
import { createContext } from "react"
import {song_play} from '@/app/layout'
import { useContext } from "react"
export const cont = createContext();
function Body({song}) {
const setplay_song = useContext(song_play)
  const [search, setsearch] = useState('');
 function search_song(e) {    
    setsearch(e);
  } 
  const [hin, sethin] = useState("none") 
  const [eng, seteng] = useState("none")
  song.map(e=>{
    if(e.type === "hindi" &&  hin === "none"){
      sethin("");
     }
     if(e.type === "english" &&  eng === "none"){
       seteng(""); 
      }
    })
  return(   
        <>
        <div className="body"> 
      <Foot />  
      <div className="content">
      <cont.Provider value={{search,search_song}}>  
        <Nave/>  
        </cont.Provider>
      <div style={{display:hin}} className="h padding">
      <h1>Best Hindi Songs</h1>  
      <div className="hindi">
      {song.map((e,i)=>{
        if(e.name.match(new RegExp(search,'gi')) && e.type === 'hindi'){ 
          
          return( 
          <>
          <Comp
            ke={e.id}  
            onClick={()=>{setplay_song(e)}}            
            url={e.url}
            link={e.link}
            name={e.name} 
            type={e.type}
            /> 
          </>  
        )
        }   
      })} 
        </div> 
      </div>
      <div style={{display:eng}} className="h">
      <h1>Best English Songs</h1>
      <div className="english">
      {song.map((e,i)=>{
        if(e.name.match(new RegExp(search,'gi')) && e.type === 'english'){ 
          if(eng === "none"){
          seteng("");
         }
          return( 
          <>
          <Comp
            ke={e.id}  
            onClick={()=>{setplay_song(e)}}            
            url={e.url}
            link={e.link}
            name={e.name} 
            type={e.type}
            /> 
          </>  
        )
        }   
      })} 
        </div> 
      
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
        </div> 
           <div className="bb">
            <img src='https://images.pexels.com/photos/290660/pexels-photo-290660.jpeg?auto=compress&cs=tinysrgb&w=600' alt="bg" />
            </div>
            <div className="bb2">
            </div>  
        </div>    
        </>
    )
}   
export default memo(Body) 