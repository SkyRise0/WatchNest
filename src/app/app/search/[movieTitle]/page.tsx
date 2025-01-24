"use client"
import MovieCards from "@/app/components/MovieCards";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function SearchPage () {

    const params = useParams();

    const searchMovies = useQuery({
        queryKey: ["movies", params.movieTitle],
        queryFn: () => api.getMoviesSearch(params.movieTitle as string)
    })
    
    console.log(searchMovies.data)

    return (
        <main className="grid grid-cols-4 bg-gray-900">
            {searchMovies.isSuccess ? (
                <>
                {searchMovies.data.results.map((movie: any, index: any) => (
                    <MovieCards movie={movie} key={index}/>
                ))}
                </>
            ) : null}
        </main>
    );
}