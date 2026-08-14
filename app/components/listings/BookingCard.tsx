"use client";
import { DateRange, type Range } from "react-date-range";
import { useState } from "react";
import { addDays, differenceInCalendarDays, eachDayOfInterval, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "../ui/Button";
import { LuCheck } from "react-icons/lu";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

interface BookingCardProps {
  pricePerNight: number;
  listingId: string;
  hostId: string;
  reservations: { startDate: string; endDate: string }[];
}

export default function BookingCard({ pricePerNight, listingId, hostId, reservations }: BookingCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const isDisabledForHost = session?.user.id === hostId;
  const [range, setRange] = useState<Range[]>([
    { startDate: new Date(), endDate: addDays(new Date(), 1), key: "selection" },
  ]);

  const startDate = range[0]?.startDate;
  const endDate = range[0]?.endDate;
  const nights = startDate && endDate ? Math.max(differenceInCalendarDays(endDate, startDate), 1) : 0;
  const total = nights * pricePerNight;

  const disabledDates = reservations.flatMap((r) =>
    eachDayOfInterval({ start: new Date(r.startDate), end: new Date(r.endDate) })
  );

  const onReserve = async () => {
    if (!startDate || !endDate) return;
    if (!session) {
      toast("Signin to reserve!", { style: { background: "#07191E", color: "#02F5A1", border: "1px solid #02F5A1" } });
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/reservations", { startDate, endDate, listingId, totalPrice: total });
      toast("Listing reserved", { style: { background: "#07191E", color: "#02F5A1", border: "1px solid #02F5A1" } });
      router.refresh();
      router.push("/trips");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.error, { style: { background: "#07191E", color: "#02F5A1", border: "1px solid red" } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:sticky lg:top-8">
      <div className="border border-[#02F5A1]/20 rounded-2xl p-2 sm:p-8 shadow-xl bg-[#07191E]">
        {/* price */}
        <div className="flex items-center gap-2 mb-6">
          <p className="text-xl font-bold text-[#02F5A1]">${pricePerNight}</p>
          <span className="text-lg text-[#02F5A1]/60">night</span>
        </div>

        {/* calendar */}
        <div className="overflow-auto no-scrollbar rounded-xl">
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
            minDate={new Date()}
            showDateDisplay={false}
            rangeColors={["#02F5A1"]}
            disabledDates={disabledDates}
          />
        </div>

        {/* selected dates */}
        <div className="border border-[#02F5A1]/20 rounded-xl overflow-hidden mt-4 mb-6">
          <div className="grid grid-cols-2">
            <div className="p-4">
              <p className="text-xs font-bold uppercase text-[#02F5A1]/60">Check-in</p>
              <p className="font-semibold text-[#02F5A1]">{startDate ? format(startDate, "MMM d,yyyy") : "-"}</p>
            </div>
            <div className="p-4 border-l border-[#02F5A1]/20">
              <p className="text-xs font-bold uppercase text-[#02F5A1]/60">Check-out</p>
              <p className="font-semibold text-[#02F5A1]">{endDate ? format(endDate, "MMM d,yyyy") : "-"}</p>
            </div>
          </div>
        </div>

        {/* pricing */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-[#02F5A1]/70">
            <span>${pricePerNight} x {nights}</span>
            <span>${total}</span>
          </div>
          <div className="border-t border-[#02F5A1]/20 pt-4 flex justify-between font-bold text-lg text-[#02F5A1]">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        <Button rounded onClick={onReserve} loading={loading} disabled={isDisabledForHost || loading}>
          Reserve
        </Button>

        <p className="text-center text-sm text-[#02F5A1]/60 mt-4">
          <LuCheck className="inline mr-1 text-[#02F5A1]" />
          You won&apos;t be charged yet
        </p>
      </div>
    </div>
  );
}
