"use client";

import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { cn } from "@/lib/utils";

export function FavoriteButton({ vehicleId }: { vehicleId: string }) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((s) => s.favorites.vehicleIds.includes(vehicleId));

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleFavorite(vehicleId))}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
      className="rounded-full p-1.5 text-ink-faint transition-colors hover:bg-ink/5 hover:text-ink"
    >
      <Heart className={cn("h-4 w-4", isFavorite && "fill-brass text-brass")} aria-hidden />
    </button>
  );
}
