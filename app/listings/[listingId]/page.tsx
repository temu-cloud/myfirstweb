 
import ListingPage from "@/app/components/listings/ListingPage";
import ListingViewSkeleton from "@/app/components/skeletons/ListingViewSkeleton";
import { Suspense } from "react";



export default async function Page({params}:{params:Promise<{listingId:string}>}) {
    const listingId = (await params).listingId
  return (
   <Suspense fallback={<ListingViewSkeleton/>} >
    <ListingPage listingId={listingId} />
   </Suspense>
  )
}