"use client";
import useCountries from "@/app/custom-hooks/useCountries";
import { Listing } from "@/app/generated/prisma/client";
import Image from "next/image";
 
import HeartButton from "../favorites/HeartButton";
import { useRouter } from "next/navigation";
import format from "date-fns/format";
import CancelReservationButton from "../reservations/CancelReservationButton";

interface ListingCardProps {
  listing: Listing
    currentUser?: {
    id: string;
    favoriteIds: string[];
  } | null;
  hideFavoriteButton?:boolean;
  property?:boolean
  reservation?:{
    id:string;
    startDate:string;
    endDate:string;
    totalPrice:number;
  };
  
  trip?: boolean;
  actionLabel?: string;
}

function ListingCard({ listing,currentUser,hideFavoriteButton,property,reservation,actionLabel,
  trip, }: ListingCardProps) {
  const { getByValue } = useCountries();
  const router=useRouter();
  const location = getByValue(listing.locationValue);
  return (
    <div className="group cursor-pointer" onClick={()=>router.push(`/listings/${listing.id}`)}>
      {/*image*/}
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <Image
          src={listing.imageSrc}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition group-hover:scale-105"
          unoptimized
        />

        {!hideFavoriteButton && (        <HeartButton listingId={listing.id} currentUser={currentUser}/>)}
      </div>
      <div className="space-y-1 mt-3 text-sm bg" >
        <p className="text-gray-500">
          {
            location ? `${location.region},${location.label}` : listing.locationValue
          }
        </p>
        <p className="text-gray-900 truncate">{listing.title}</p>
         {
          reservation?(<>
          <p className="text-gray-500 text-sm">{format(new Date(reservation.startDate),"MM d")}-{" "}{format(new Date(reservation.endDate),"MM d")}</p>
          <p>${reservation.totalPrice}</p>
          </>):( <p className="pt-1">
          <span className="font-semibold">${listing.price}</span> / night
        </p>)
         }
        {
          property&&(
            <div className="mt-3">
              <p className="text-sm text-gray-500">post on {new Date(listing.createdAt).toLocaleDateString()}</p>
            </div>
          )
        }
                {trip && reservation && actionLabel && (
          <CancelReservationButton
            actionLabel={actionLabel}
            reservationId={reservation.id}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard