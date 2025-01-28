"use client";
import Navigation from "./components/Navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import MovieCards from "./components/MovieCards";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {

  const popularMovies = useQuery({
    queryKey: ["movies"],
    queryFn: api.getMoviesPopular
  })
  
  return (
    <div>
      <Navigation />
        {popularMovies.isLoading ? <LoadingSpinner /> : null}
        {popularMovies.isSuccess ? (
          <main className="grid grid-cols-4 bg-gray-900">
            {popularMovies.data.results.map((movie: any, index: any) => (
              <MovieCards movie={movie} key={index}/>
            ))}
          </main>
        ): null}
    </div>
  );
}