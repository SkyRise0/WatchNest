import { StarIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function ListMovie({ movie, onDelete, ratingIsForMovie }) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
            <Link href={"/app/moviePage/" + movie.movieId}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                />
            </Link>

            <div className="px-4 py-2">
                <Link href={"/app/moviePage/" + movie.movieId}>
                    <h3 className="text-lg font-bold hover:text-gray-400">{movie.title}</h3>
                </Link>
            </div>

            {ratingIsForMovie ? (
                <div className="px-4 pb-2 flex items-center gap-2">
                    <StarIcon className="h-8 w-8 text-yellow-400" />
                    <h2 className="flex items-center gap-1">
                        <span className="font-bold text-teal-400 text-xl">{ratingIsForMovie.rating}</span>
                        <span className="text-coolGray-500">/ 10</span>
                    </h2>
                </div>
            ) : null}

            <div className="px-4 mt-auto mb-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 w-full"
                onClick={() => onDelete.mutate(movie.id)}>
                    Remove
                </button>
            </div>
        </div>
    );
}
