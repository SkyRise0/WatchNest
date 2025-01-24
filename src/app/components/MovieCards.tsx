import Link from "next/link";

export default function MovieCards ({ movie }) {

    return (
      <div className="grid grid-cols-1 gap-6 p-6 bg-gray-900 text-white h-[463px] w-[242px]">
        <div
        className="bg-gray-800 shadow-lg rounded-md overflow-hidden hover:shadow-xl transition-shadow duration-200"
        >
        <Link href={"/app/moviePage/" + movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-68 object-cover"
            />
        </Link>  
        <div className="p-4">
            <Link href={"/app/moviePage/" + movie.id} className="text-md font-semibold hover:text-gray-300">{movie.title}</Link>
            <p className="text-sm text-gray-400">Release Date: {movie.release_date}</p>
        </div>
        </div>
      </div>
    );
}