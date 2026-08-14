"use client";

import { useFavorite } from "@/app/custom-hooks/useFavorite";
import clsx from "clsx";
import { LuHeart } from "react-icons/lu";

interface HeartButtonProps {
    listingId: string;
    currentUser?: { id: string; favoriteIds: string[] } | null;
}

export default function HeartButton({ listingId, currentUser }: HeartButtonProps) {
    const { toggleFavorite, hasFavorited } = useFavorite({ listingId, currentUser });
    return (
        <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
            className="absolute top-3 right-3 p-2 rounded-full bg-[#07191E]/80 hover:bg-[#07191E] border border-[#02F5A1]/30 shadow cursor-pointer"
        >
            <LuHeart
                size={18}
                className={clsx("transition", hasFavorited ? "fill-[#02F5A1] text-[#02F5A1]" : "text-[#02F5A1]/60")}
            />
        </button>
    );
}
