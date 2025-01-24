"use client"
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function MoviePage () {

    const params = useParams();

    const movieDetails = useQuery({
        queryKey: ["movie", params.movieId],
        queryFn: () => api.getMovieFromId(params.movieId as string)
    })

    console.log(movieDetails.data)

    return (
        <div>
            {movieDetails.isSuccess? (
                <div className="bg-gray-900 text-white min-h-screen">
                <div className="relative">
                  <img src={`https://image.tmdb.org/t/p/w500${movieDetails.data.backdrop_path}`} alt={`${movieDetails.data.title} Poster`}
                    className="w-full h-[600px] object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 flex items-end">
                    <div className="p-6">
                      <h1 className="text-4xl font-bold">{movieDetails.data.title}</h1>
                    </div>
                  </div>
                </div>
          
                <div className="max-w-6xl mx-auto px-6 py-10">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Overview</h2>
                    <p className="text-gray-300">{movieDetails.data.overview || "No overview available."}</p>
                  </div>
        
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
                      <div className="grid grid-cols-2 gap-4">
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
                        <div className="grid grid-cols-2 gap-4">
                          <button className="px-6 py-2 bg-teal-700 text-white rounded-lg shadow-md hover:bg-teal-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all">
                            Favourite
                          </button>
                          <button className="px-6 py-2 bg-rose-700 text-white rounded-lg shadow-md hover:bg-rose-800 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all">
                            Add to Watchlist
                          </button>
                        </div>
                      </div>
          
                      <div>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ): null}
        </div>
      );
}