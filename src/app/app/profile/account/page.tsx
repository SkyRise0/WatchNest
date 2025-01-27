"use client"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListMovie from "@/app/components/ListMovie";
import MovieCards from "@/app/components/MovieCards";
import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export default function Profile () {

    const queryClient = useQueryClient();

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

    console.log(currentUser.data);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
            <div className="w-full max-w-md p-6 bg-gray-200 rounded-lg shadow-lg mt-2">
                {currentUser.isSuccess ? (
                    <div className="text-center">
                        <img src={currentUser.data?.image} alt="Profile Picture" 
                        className="w-24 h-24 mx-auto rounded-full shadow-md"/>

                        <h1 className="mt-4 text-2xl font-bold text-gray-700">
                            {currentUser.data?.name}
                        </h1>

                        <p className="mt-2 text-gray-500">
                            {currentUser.data?.email}
                        </p>

                        <button onClick={() => signOut()} className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                            Sign Out
                        </button>
                    </div>
                ) : null}
            </div>
            {currentUser.isSuccess ? (

                <div className="flex flex-col items-start px-8 py-8 text-gray-300 w-full">
                <h1 className="text-3xl font-bold mb-6">Your Movies</h1>
                
                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Favorite Movies</h2>
                    {currentUser.data.favourites.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {currentUser.data?.favourites.map((movie: any, index: number) => (
                                <ListMovie movie={movie} key={index} onDelete={removeFavouriteMovie}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">You have no favorite movies.</p>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Watchlist Movies</h2>
                    {currentUser.data.watchlist.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {currentUser.data.watchlist.map((movie: any, index: number) => (
                                <ListMovie movie={movie} key={index} onDelete={removeWatchListMovie}/>
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