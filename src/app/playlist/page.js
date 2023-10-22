"use client";
import { useSession } from "next-auth/react";
import Body from "../component/Bod";
import { useDispatch,useSelector } from "react-redux";
import { addSong,addImg} from "../reducer/slice";
export default function page(requset) {
  const data = useSelector(a=>a.songs);
  const dispatch = useDispatch();
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    if (data == "") {
      fetch(`api/${session?.user?.email}`)
      .then((a) => a.json())
      .then((a) => {
      dispatch(addSong(a.like))
      dispatch(addImg(a.img))
      });
    }
  }

  return (
    <>
      <Body song={data}  />
    </>
  );
}
