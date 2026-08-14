import { useCancelReservation } from "@/app/custom-hooks/useCancelReservation";

interface CancelReservationButtonProps {
    reservationId: string;
    actionLabel: string;
}

export default function CancelReservationButton({ actionLabel, reservationId }: CancelReservationButtonProps) {
    const { loadingId, cancelReservation } = useCancelReservation();
    const isLoading = loadingId === reservationId;
    return (
        <button
            onClick={(e) => { e.stopPropagation(); cancelReservation(reservationId); }}
            disabled={isLoading}
            className={`mt-3 w-full border border-[#02F5A1]/30 rounded-lg py-2 text-sm font-medium text-[#02F5A1] cursor-pointer hover:bg-[#02F5A1]/10 transition disabled:opacity-50 ${isLoading ? "cursor-not-allowed" : ""}`}
        >
            {isLoading ? "Cancelling..." : actionLabel}
        </button>
    );
}
