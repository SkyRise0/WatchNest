"use client"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListMovie from "@/app/components/ListMovie";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import MovieCards from "@/app/components/MovieCards";
import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation"

export default function Profile () {

    const queryClient = useQueryClient();

    const { data: session } = useSession();
    
    if (!session) {
        return redirect ("/app/profile/login");
    }

    const currentUser = useQuery({
        queryKey: ["user"],
        queryFn: api.getCurrentUser
    })

    const removeFavouriteMovie = useMutation({
        mutationFn: (movieId: string) => api.deleteFromFavourites(movieId),
        onSuccess: () => queryClient.invalidateQueries()
    })

    const removeWatchListMovie = useMutation({
        mutationFn: (movieId: string) => api.deleteFromWatchList(movieId),
        onSuccess: () => queryClient.invalidateQueries() 
    })

    const reviews = useQuery({
        queryKey: ["review"],
        queryFn: () => api.getReviews(currentUser.data.id)
    })

    const ratingIsForMovie = (movieTitle: string) => { 
        return reviews.data.find((spesificRating: any) => { return spesificRating.title === movieTitle})
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
            {currentUser.isLoading ? <LoadingSpinner /> : null}
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg mt-2">
                {currentUser.isSuccess ? (
                    <div className="text-center text-white">
                        <img src={currentUser.data?.image} alt="Profile Picture" 
                        className="w-24 h-24 mx-auto rounded-full shadow-md"/>

                        <h1 className="mt-4 text-3xl font-semibold text-gray-100">
                            {currentUser.data?.name}
                        </h1>

                        <p className="mt-2 text-gray-400">
                            {currentUser.data?.email}
                        </p>

                        <button onClick={() => signOut()} className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                            Sign Out
                        </button>
                    </div>
                ) : null}
            </div>
            {currentUser.isSuccess && reviews.isSuccess ? (

                <div className="flex flex-col items-start px-8 py-8 text-gray-300 w-full">
                <h1 className="text-3xl font-bold mb-6">Your Movies</h1>
                
                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Favorite Movies</h2>
                    {currentUser.data.favourites.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6">
                            {currentUser.data?.favourites.map((movie: any, index: number) => (
                                <ListMovie movie={movie} key={index} onDelete={removeFavouriteMovie} rating={reviews.data} ratingIsForMovie={ratingIsForMovie(movie.title)}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">You have no favorite movies.</p>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Watchlist Movies</h2>
                    {currentUser.data.watchlist.length > 0 ? (
                        <div className="grid grid-cols-4 gap-6">
                            {currentUser.data.watchlist.map((movie: any, index: number) => (
                                <ListMovie movie={movie} key={index} onDelete={removeWatchListMovie} ratingIsForMovie={ratingIsForMovie(movie.title)}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">Your watchlist is empty.</p>
                    )}
                </div>
            </div>
            ): null}
        </div>
    );
}