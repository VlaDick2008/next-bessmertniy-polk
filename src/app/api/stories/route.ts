import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter: any = searchParams.get('filter');

  let storiesList;
  if (filter === 'desc' || filter === 'asc') {
    storiesList = await prismaClient.stories.findMany({
      where: {
        isVerified: true,
      },
      orderBy: [
        {
          createdAt: filter,
        },
      ],
    });
  }

  if (filter === 'alfbate') {
    storiesList = await prismaClient.stories.findMany({
      where: {
        isVerified: true,
      },
      orderBy: [
        {
          subname: 'asc',
        },
      ],
    });
  }

  if (filter === 'descAlfbate') {
    storiesList = await prismaClient.stories.findMany({
      where: {
        isVerified: true,
      },
      orderBy: [
        {
          subname: 'desc',
        },
      ],
    });
  }

  if (!storiesList) return new NextResponse('No stories found', { status: 404 });

  return NextResponse.json(storiesList);
}
