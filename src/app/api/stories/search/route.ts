import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  const searchedStories = await prismaClient.stories.findMany({
    where: {
      isVerified: true,
      OR: [
        {
          name: {
            contains: query as string,
            mode: 'insensitive',
          },
        },
        {
          subname: {
            contains: query as string,
            mode: 'insensitive',
          },
        },
        {
          subsubname: {
            contains: query as string,
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  return NextResponse.json(searchedStories);
}
