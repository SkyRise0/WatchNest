"use client"
import { api } from "@/lib/axios";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function RatingStars ({ movieTitle, ratingSuccess, setRatingSuccess }) {
    const [hoveredStars, setHoveredStars] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);

    const stars = Array.from({ length: 10 }, (_, index) => index + 1);

    const createReview = useMutation({
        mutationFn: () => api.createReview({ title: movieTitle, rating: selectedStars})
    })

    return (
        <div className="flex space-x-2">
            {stars.map((star) => (
                <div key={star}
                onMouseEnter={() => setHoveredStars(star)} 
                onMouseLeave={() => setHoveredStars(0)}
                onClick={() => {
                    setSelectedStars(star);
                    createReview.mutate();
                    setRatingSuccess(true);
                    setTimeout(() => { setRatingSuccess(false)}, 2000)
                }}
                className="cursor-pointer"
                >
                {star <= hoveredStars || star <= selectedStars ? (
                    <StarIcon className="w-8 h-8 text-yellow-600" />
                ) : (
                    <StarOutlineIcon className="w-8 h-8 text-yellow-700" />
                )}
                </div>
            ))}
        </div>
    )
}