import Link from "next/link"
import { memo, useState } from "react"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
const Foot = ()=>{
  const im = useSelector(a=>a.img);
    const [img, setimg] = useState("")
    let {status,data:session} =  useSession()
    if (status === 'authenticated') {
      if (img  === "") {
        setimg(session?.user)
      } 
    }
    useEffect(() => {
      let storedUser = localStorage.getItem("user");
  
      if (!storedUser) return;
      
        const usr = JSON.parse(storedUser); // ✅ Convert string to object
        if (!usr?.email) return;
        setimg(usr)
    }, [])
    
    return(
        <> 
            <div key={50000} className="foot">
            <div className="home foot_elm">
            <Link href={'/'}>
                <img src="home.svg" alt="." />
            </Link>
            </div>
            <div   className="search foot_elm">
            {(session)?<Link href={'/like'}>
            <img src="like.svg" alt="." />
            </Link>: <div onClick={()=>signIn('google')} ><img src="like.svg" alt="." /></div>}
             </div>
            <div className="favorit foot_elm">
            {(session)?<Link href={'/playlist'}>
            <img src="list.svg" alt="." />
            </Link>: <div onClick={()=>signIn('google')} ><img src="list.svg" alt="." /></div>}
            </div>
            <div onClick={()=>{(!session)?signIn('google'):signOut('google')}} className="profile foot_elm">
            <img height={40} width={40} src={(im === "acc.svg")?"account.svg":im}  alt="." />
            </div> 
            </div> 
        </>   
    )
}   
export default memo(Foot)