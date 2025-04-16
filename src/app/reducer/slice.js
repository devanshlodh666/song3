import { createSlice,nanoid,current } from "@reduxjs/toolkit";

const initialState = {
  songs:[],
  img:"acc.svg",
  S:[],
  email1:"" 
 } 

const Slice = createSlice({ 
  name:"songs", 
  initialState,
  reducers:{ 
    addSong:(state,action)=>{
      state.songs = action.payload;
    },
    addImg:(state,action)=>{
      state.img = action.payload;
    },
    addS:(state,action)=>{
      state.S = action.payload
    },
    addEmail1:(state,action)=>{
      state.email1 = action.payload
    }
  } 
})  

export const {addSong,addImg,addS,addEmail1} = Slice.actions
export default Slice.reducer
