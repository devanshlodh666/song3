"use client"
import { signOut, useSession } from "next-auth/react";
 const page = () => {
    const {data}  = useSession();
    console.log(data);

  return (
    <>
      {/* <button onClick={}>dsdsds</button> */}
      <button onClick={()=>signOut('google')}>Logout</button>

    </>
  )
}   
export default page   