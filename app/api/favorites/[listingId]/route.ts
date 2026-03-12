import prisma from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { NextResponse } from "next/server";


export async function POST(_req: Request, { params }: { params: Promise<{ listingId: string }> },) {
    try {
     const currentUser=await getCurrentUser();
     if(!currentUser?.id){
        return NextResponse.json({error:"unauthorzed"},{status:401})
     }
     const {listingId}=await params;
     if(!listingId){
        return NextResponse.json({error:"invalid listing id"},{status:401})
     }
     const user=await prisma.user.update({
        where:{id:currentUser.id},
        data:{favoriteIds:{push:listingId}}
     })
     return NextResponse.json(user);
    }
    catch (error) {
        console.error("[FAVORITES_POST]", error);
        return NextResponse.json({
            error: "internal server error"
        },
            { status: 500 })
    }
}
export async function DELETE(_req:Request,{params}:{params:Promise<{listingId:string}>}) {
    try{
    const currentUser=await getCurrentUser();
     if(!currentUser?.id){
        return NextResponse.json({error:"unauthorzed"},{status:401})
     }
     const {listingId}=await params;
     if(!listingId){
        return NextResponse.json({error:"invalid listing id"},{status:401})
     }

    const user=await prisma.user.findUnique({
        where:{id:currentUser.id}
    })
    if(!user){
        return NextResponse.json({error:"no user found"},{status:401})
    }
    const updatedFavoriteIds=user.favoriteIds.filter((id:string)=>id!==listingId);
    const updatedUser=await prisma.user.update({
        where:{id:user.id},
        data:{favoriteIds:updatedFavoriteIds}
    })
    return NextResponse.json(updatedUser)

    }
     catch (error) {
        console.error("[FAVORITES_DELETE]", error);
        return NextResponse.json({
            error: "internal server error"
        },
            { status: 500 })
    }

    
}