import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: { movieId: string } }) {
 
    const { movieId } = await params;

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
        where: { email: session.user?.email ?? "" },
    });

    if (!currentUser) {
        return NextResponse.json({ message: "User could not be found" }, { status: 404 });
    }


    try {
        const deletedMovie = await prisma.watchlist.delete({
            where: { id: movieId }
        });

        return NextResponse.json(deletedMovie, { status: 200 });

    } catch (error) {

        console.error("Error deleting movie from watchlist:", error);
        return NextResponse.json({ message: "Failed to delete movie" }, { status: 500 });
    }
}
