"use client"
import Link from "next/link"
import { useContext,useState } from "react"
import { cont } from "./Bod"
import {signIn,signOut}  from 'next-auth/react'
import { useSession } from "next-auth/react"
import { useSelector } from "react-redux"
const Nave =  (req) => {
  
  const im = useSelector(a=>a.img);
  const [img, setimg] = useState("")
  let {status,data:session} =  useSession()
  if (status === 'authenticated') {
    if (img  === "") {  
      setimg(session?.user) 
      fetch('/api',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          email:session?.user?.email,
          img:session?.user?.image    
        })     
      })
    } 
  }
 const {search,search_song} =  useContext(cont);  
  return (  
    <>
    <nav>   
    <div className="logo">
    <img src="logo.jpg" alt="." />
    <Link className="link" href={'/'}>
    <h1>Sonica</h1>
    </Link> 
    </div> 
     <ul style={{overflow:"visible"}}>
     
        <li key={1}><input value={search} onChange={(e)=>search_song(e.target.value)} placeholder="search song" type="text" name="search" id="search"/></li>  
        <li className="mobile"><Link href={"/"} className="link" >Home</Link></li>
        <li className="mobile">{(session)?<Link href={"/like"} className="link" >Like</Link>:<p className="link" onClick={()=>signIn('google')}>playlist</p>}</li>  
        <li style={{overflow:'visible'}} key={2} className="mobile"> 
        <Link key={2000} className="link" href={'/'}>
        <div  style={{borderRadius:'50%',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>{(!session)?signIn('google'):signOut('google')}}   key={100} className="profile_style">
        <img height={38} src={(im === "acc.svg")?"account.svg":im} alt="." />
        </div>       
        </Link></li>
      </ul> 
    </nav> 
    </>
  )
}
export default Nave   