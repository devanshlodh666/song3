import { NextResponse } from "next/server";
import db from "@/db/db";
import { like } from "@/db/schema";
export async function POST(requset) {
    db(); 
    let data = await requset.json()  
    let find = await like.findOne({email:data.email})
    
    if (!find){
      let a = await new like({
         email:data.email,
         img:data.img
        }) 
       let b = await a.save();   // post
       return NextResponse.json(b)
    }
    return NextResponse.json(find)
}

export async function PUT(requset) {
   db()
   let data = await requset.json()
   let a = await like.findOne({email:data.email});
   let b = 0;

   a.like = a.like.filter(v=>{
       if(v.name != data.name){ 
         return v
      } 
      else{
         b = b + 1;
      }
    })
    if (b === 0) {
   a.like.push({
            id: data.id,
            type:data.type,
            name: data.name,
            url:data.url,
            link: data.link,
}) 
 await a.save();
 return NextResponse.json({success:"done"})
    }
    else{
    await a.save();
   return NextResponse.json({success:"done"})
    }
}


export async function DELETE(request) {
   let a = await request.json();
   let data = await like.updateOne({email:a.email},{$pull:{like:{name:a.name}}});
   // console.log(data);
   return NextResponse.json({data})
}