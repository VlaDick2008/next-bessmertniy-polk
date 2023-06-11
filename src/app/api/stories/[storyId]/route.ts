import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  storyId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const { storyId } = params;

  const storyData = await prismaClient.stories.findUnique({
    where: {
      id: storyId,
    },
  });

  return NextResponse.json(storyData);
}
