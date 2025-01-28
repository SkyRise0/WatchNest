"use client"
import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import RatingStars from "@/app/components/RatingStars";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function MoviePage () {

    const params = useParams();

    const queryClient = useQueryClient();

    const movieDetails = useQuery({
        queryKey: ["movie", params.movieId],
        queryFn: () => api.getMovieFromId(params.movieId as string)
    })

    const addToWatchList = useMutation({
      mutationFn: (movie: any) => api.addToWatchList({ title: movie.title, id: movie.id, poster_path: movie.poster_path}),
    });

    const addToFavourites = useMutation({
      mutationFn: (movie: any) => api.addToFavourte({ title: movie.title, id: movie.id, poster_path: movie.poster_path}),
      onSuccess: () => queryClient.invalidateQueries()
    });

    const movieDetailsAdd = {
      title: movieDetails.data?.title,
      id: movieDetails.data?.id,
      poster_path: movieDetails.data?.poster_path
    }

    const [rating, setRating] = useState(false);
    const [ratingSuccess, setRatingSuccess] = useState(false);

    return (
        <div>
            {movieDetails.isLoading ? <LoadingSpinner /> : null}
            {movieDetails.isSuccess? (
                <main className="bg-gray-900 text-white min-h-screen">
                <div className="relative">
                  <img src={`https://image.tmdb.org/t/p/w780${movieDetails.data.backdrop_path}`} alt={`${movieDetails.data.title} Poster`}
                    className="w-full h-[600px] object-cover object-center"
                  />
                  <section className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 flex items-end">
                    <div className="px-6">
                      <div className="mr-6">
                        <h1 className="text-4xl font-bold">{movieDetails.data.title}</h1>
                        <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                          <StarIcon className="h-8 w-8 text-yellow-400" />
                          {movieDetails.data.vote_average.toFixed(1)} / 10
                        </h2>
                      </div>
                      <div className="pt-2 mr-6 flex justify-center">
                        <button onClick={() => {!rating ? setRating(true) : setRating(false)}} className="flex p-2 gap-2 text-yellow-600 rounded-xl hover:bg-yellow-700/50 items-center">
                          <StarIcon className="w-6 h-6 text-transparent stroke-yellow-600" />
                          <h2 className="text-lg">Rate it!</h2>
                        </button>
                      </div>
                      {rating ? (
                        <div className="mt-4 flex justify-start gap-2">
                          <RatingStars movieTitle={movieDetails.data.title} ratingSuccess={ratingSuccess} setRatingSuccess={setRatingSuccess} />
                        </div>
                      ): null}
                    </div>
                  </section>
                </div>
          
                <div className="max-w-6xl mx-auto px-6 py-6">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Overview</h2>
                    <p className="text-gray-300">{movieDetails.data.overview || "No overview available."}</p>
                  </section>

                  {ratingSuccess && (
                    <div className="mt-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2">
                      <CheckCircleIcon className="w-6 h-6 animate-pulse" />
                      <p className="text-lg">Your rating has been recorded! Thank you!</p>
                    </div>
                  )}
        
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.data.poster_path}`}
                        alt={`${movieDetails.data.title} Poster`}
                        width={500}
                        height={750}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
          
                    <div className="md:col-span-2 space-y-6">
                      <section className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">Genres</h3>
                          <p className="text-gray-300">
                            {movieDetails.data.genres.map((genre: any) => genre.name).join(", ")}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Release Date</h3>
                          <p className="text-gray-300">{movieDetails.data.release_date || "TBA"}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Status</h3>
                          <p className="text-gray-300">{movieDetails.data.status}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-white">
                          <button className={!movieDetails.data.requesterHasFavourited ?
                            "px-6 py-2 bg-teal-700 rounded-lg shadow-md hover:bg-teal-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            :"px-6 py-2 bg-red-700 rounded-lg shadow-md hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                          }
                          onClick={() => {addToFavourites.mutate(movieDetailsAdd)}}>
                            {movieDetails.data.requesterHasFavourited ? "Unfavourite" : "Favourite"}
                          </button>
                          {!addToWatchList.isSuccess ?(
                            <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                            onClick={() => {addToWatchList.mutate(movieDetailsAdd)}}>
                              Add to Watchlist
                            </button>
                          ) : (
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-6 h-6 text-yellow-600 animate-pulse" />
                              <p className="text-yellow-500 ml-2">Added to Watchlist!</p>
                            </div>
                          )}
                        </div>
                      </section>
          
                      <section>
                        <h3 className="text-lg font-semibold">Production Companies</h3>
                        <ul className="mt-4 space-y-4">
                          {movieDetails.data.production_companies.map((company: any) => (
                            <li key={company.id} className="flex items-center space-x-4">
                              {company.logo_path && (
                                <img
                                  src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                  alt={`${company.name} Logo`}
                                  width={50}
                                  height={50}
                                  className="w-12 h-12 object-contain bg-gray-800 p-1 rounded"
                                />
                              )}
                              <span className="text-gray-300">{company.name}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </div>
                </div>
              </main>
            ): null}
        </div>
      );
}