import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET (request: NextRequest, { params }: { params: { userId: string}}) {

    const session = await getServerSession(authOptions);

    const userId = params.userId;

    if (!session) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const reviews = await prisma.review.findMany({
        where: { userId: userId}
    })

    if (!reviews) {
        return NextResponse.json({message: "You have no reviews"})
    }

    return NextResponse.json(reviews, {status: 200});
}