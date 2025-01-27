import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  try {
    
    const movieData = await request.json();

    if (!movieData || !movieData.title || !movieData.id || !movieData.poster_path) {
      return NextResponse.json({ message: "Invalid movie data received" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
      include: { favourites: true}
    });

    if (!currentUser) {
      return NextResponse.json({ message: "User could not be found" }, { status: 404 });
    }

    const exsistingMovie = currentUser.favourites.find((movie) => { return movie.title === movieData.title});

    if (!exsistingMovie) {

      const favouriteMovie = await prisma.favourite.create({
        data: {
          title: movieData.title,
          movieId: movieData.id,
          poster_path: movieData.poster_path,
          user: {
            connect: { id: currentUser.id },
          },
        },
      });

      console.log("Created favourite movie:", favouriteMovie); 
      
      return NextResponse.json(favouriteMovie, { status: 200 });
    } else {

      await prisma.favourite.delete({
        where: { id: exsistingMovie.id, userId: currentUser.id}
      })

      return NextResponse.json({message: "Unfavourited movie"}, { status: 200 })
    }

  } catch (error) {
    console.error("Error adding to favourites:", error);
    return NextResponse.json({ message: "An error occurred while adding to favourites" },{ status: 500 }    );
  }
}
