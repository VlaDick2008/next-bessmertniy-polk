import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter: any = searchParams.get('filter');
  const amount = searchParams.get('amount');

  const recentStories = await prismaClient.stories.findMany({
    where: {
      isVerified: true,
    },
    orderBy: [
      {
        createdAt: filter,
      },
    ],
    take: Number(amount),
  });
  return NextResponse.json(recentStories);
}
