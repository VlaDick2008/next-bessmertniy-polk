import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const storiesCount = await prismaClient.stories.count({
    where: {
      isVerified: true,
    },
  });

  return NextResponse.json(storiesCount);
}
