 
 
import ListingViewSkeleton from "@/app/components/skeletons/ListingViewSkeleton";
import TripsPage from "@/app/components/trips/TripsPage";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<ListingViewSkeleton/>} >
      <TripsPage/>
    </Suspense>
  )
}