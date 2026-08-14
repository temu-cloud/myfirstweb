export default function ListingCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(10)].map((_, index) => (
        <div className="animate-pulse" key={index}>
          <div className="aspect-square rounded-xl bg-[#02F5A1]/10" />
          <div className="mt-3 space-y-2">
            <div className="h-4 w-3/4 bg-[#02F5A1]/10 rounded" />
            <div className="h-3 w-full bg-[#02F5A1]/10 rounded" />
            <div className="h-3 w-1/2 bg-[#02F5A1]/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
