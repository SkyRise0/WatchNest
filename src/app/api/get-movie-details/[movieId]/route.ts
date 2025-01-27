import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET (request: NextRequest, { params }: { params: { movieId: number}}) {

    const movieId = await params.movieId;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/' + movieId,
        params: {language: 'en-US'},
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDE0M2JmZDE4MGJiYzI1ODlmNWI3YzEyMmJmOTMzZCIsIm5iZiI6MTczNzEzODA4OC41Mzc5OTk5LCJzdWIiOiI2NzhhOWZhOGRiZmU1MGFhM2QxZDJlNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.efG6KJ2Cu1OjSf60x0NFkcTQagg15m6GunALCt4NYDw'
        }
    };

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user?.email ?? ""},
      include: {
        favourites: true
      }
    })

      try {
        const response = await axios.request(options);

        const exsistingMovie = currentUser?.favourites.find((movie) => { return movie.title === response.data.title});

        let movieDetails = {
          ...response.data,
          requesterHasFavourited: false
        }

        if (exsistingMovie) {
          movieDetails = {
            ...response.data,
            requesterHasFavourited: true
          }
        }

        return NextResponse.json(movieDetails, { status: 200 });
    
      } catch (error: any) {
    
        return NextResponse.json({ error: 'Failed to fetch movies', details: error.message }, { status: 500 });
      }
}