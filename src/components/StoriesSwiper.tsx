import React from 'react';
import Image from 'next/image';
import getRecentStories from '@/libs/getRecentStories';
import { Stories } from '@prisma/client';
import CarouselComponent from './CarouselComponent';

const StoriesSwiper = async () => {
  const storiesData: Promise<Stories[]> = getRecentStories();
  const recentStories = await storiesData;

  return (
    <>
      <h2 className="text-3xl text-center my-2">Недавно добавленые</h2>
      <hr className="border border-neutral-300 mb-3" />
      <CarouselComponent>
        {recentStories.map((story) => (
          <div key={story.id} className="h-[150px] w-[105px] flex items-center relative mb-2">
            {!story.photo ? (
              <Image src="/placeholder.png" fill alt="person" className="rounded-lg object-cover" />
            ) : (
              <Image
                src={story.photo as string}
                fill
                alt="person"
                className="rounded-lg object-cover"
              />
            )}
          </div>
        ))}
      </CarouselComponent>

      <hr className="border border-neutral-300 mt-2" />
    </>
  );
};

export default StoriesSwiper;
