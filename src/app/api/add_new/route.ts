import prismaClient from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, photo, info, subname, subsubname } = body;

  if (!name || !subname || !subsubname)
    return new NextResponse('Fields are empty', { status: 404 });

  const newStory = await prismaClient.stories.create({
    data: {
      id: createId(),
      name: name,
      photo: photo,
      info: info,
      subname: subname,
      subsubname: subsubname,
      isVerified: false,
    },
  });

  return NextResponse.json(newStory);
}
