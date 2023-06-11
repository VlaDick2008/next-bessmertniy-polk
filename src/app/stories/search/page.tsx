'use client';

import Loader from '@/components/Loader';
import StoryCard from '@/components/StoryCard';
import { Stories } from '@prisma/client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';

const fetchPosts = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch stories');
  }

  return res.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('query') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');

  const { data, isLoading }: { data: Stories[]; isLoading: boolean } = useSWR(
    `/api/stories/search?query=${encodedSearchQuery}`,
    fetchPosts,
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-gray-800 md:text-[42px] text-3xl md:mt-4 mt-0 md:mb-4 md:p-0 px-4 pt-4">
            Результат поиска по &quot;{searchQuery}&quot;
          </h1>
          <div className="flex flex-col gap-4 md:mt-4 mt-0 md:p-0 p-4">
            {data?.map((story) => (
              <StoryCard
                id={story.id}
                name={story.name}
                subname={story.subname}
                subsubname={story.subsubname}
                photo={story.photo as string}
                key={story.id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SearchPage;
