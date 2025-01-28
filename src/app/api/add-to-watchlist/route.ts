import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  try {
    
    const movieData = await request.json();

    console.log(movieData);

    if (!movieData || !movieData.title || !movieData.id || !movieData.poster_path) {
      return NextResponse.json({ message: "Invalid movie data received" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
      include: { watchlist: true }
    });

    if (!currentUser) {
      return NextResponse.json({ message: "User could not be found" }, { status: 404 });
    }

    const exsistingMovie = currentUser.watchlist.find((movie) => { return movie.title === movieData.title});

    if (exsistingMovie) {
      return NextResponse.json({message: "Movie is already in watch list"}, {status: 200})
    }

    const watchListMovie = await prisma.watchlist.create({
      data: {
        title: movieData.title,
        movieId: movieData.id,
        poster_path: movieData.poster_path,
        user: {
          connect: { id: currentUser.id },
        },
      },
    });

    console.log("Created favourite movie:", watchListMovie); 

    return NextResponse.json(watchListMovie, { status: 200 });

  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return NextResponse.json({ message: "An error occurred while adding to watchlist" },{ status: 500 }    );
  }
}
