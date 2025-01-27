import Link from "next/link";

export default function ListMovie({ movie, onDelete}) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Link href={"/app/moviePage/" + movie.movieId}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
            />
            </Link>

            <div className="p-4">
                <Link href={"/app/moviePage/" + movie.movieId}>
                    <h3 className="text-lg font-bold hover:text-gray-400">{movie.title}</h3>
                </Link>
            </div>
            <div className="flex justify-center mb-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
                onClick={() => onDelete.mutate(movie.id)}>
                    Remove
                </button>
            </div>
        </div>
    );
}