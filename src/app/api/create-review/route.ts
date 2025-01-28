import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
        where: {email: session.user?.email ?? ""}
    });

    if (!currentUser) {
        return NextResponse.json({message: "User could not be found" }, {status: 404});
    };

    const reviewDetails = await request.json();

    console.log(reviewDetails)

    const review = await prisma.review.create({
        data: {
            userId: currentUser.id,
            title: reviewDetails.title,
            rating: reviewDetails.rating
        }
    });

  return NextResponse.json(review, { status: 200 });
}
