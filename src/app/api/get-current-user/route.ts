import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET (request: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const currentUser = await prisma.user.findUnique({
        where: {email: session.user?.email ?? ""},
        include: {
            favourites: true,
            watchlist: true
        }
    });

    if (!currentUser) {
        return NextResponse.json({message: "User could not be found" }, {status: 404});
    };

    return NextResponse.json(currentUser, {status: 200});
}