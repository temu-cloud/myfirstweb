 
import ListingCardSkeleton from '@/app/components/skeletons/ListingCardSkeleton'
import ReservationPage from '@/app/reservations/ReservationPage'
import { Suspense } from 'react'


export default function Page() {
  return (
    <Suspense fallback={<ListingCardSkeleton/>} >
      <ReservationPage/>
    </Suspense>
  )
}