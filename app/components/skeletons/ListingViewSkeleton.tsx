export default function ListingViewSkeleton() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse mt-4">
      <div className="h-8 w-3/4 bg-[#02F5A1]/10 rounded mb-6" />
      <div className="w-full h-80 sm:h-110 lg:h-140 bg-[#02F5A1]/10 rounded-2xl mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#02F5A1]/10 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-40 bg-[#02F5A1]/10 rounded" />
              <div className="h-3 w-24 bg-[#02F5A1]/10 rounded" />
            </div>
          </div>
          <div className="h-4 w-64 bg-[#02F5A1]/10 rounded" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-[#02F5A1]/10 rounded" />
            <div className="h-4 w-full bg-[#02F5A1]/10 rounded" />
            <div className="h-4 w-5/6 bg-[#02F5A1]/10 rounded" />
          </div>
        </div>

        <div className="border border-[#02F5A1]/20 rounded-2xl p-6 h-fit space-y-6">
          <div className="h-6 w-32 bg-[#02F5A1]/10 rounded" />
          <div className="h-64 w-full bg-[#02F5A1]/10 rounded-xl" />
          <div className="h-10 w-full bg-[#02F5A1]/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
