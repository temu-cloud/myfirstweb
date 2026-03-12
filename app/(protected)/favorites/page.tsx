 
import FavoritesPage from "@/app/components/favorites/FavoritesPage";
import ListingCardSkeleton from "@/app/components/skeletons/ListingCardSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<ListingCardSkeleton/>} >
      <FavoritesPage/>
    </Suspense>
  )
}