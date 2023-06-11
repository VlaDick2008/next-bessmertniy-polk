'use client';

import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Stories } from '@prisma/client';

import StoryCard from '@/components/StoryCard';
import Loader from '@/components/Loader';
import StoriesSwiper from './StoriesSwiper';

const StoriesBlock = () => {
  const [stories, setStories] = React.useState<Stories[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortType, setSortType] = React.useState('asc');

  React.useEffect(() => {
    setIsLoading(true);
    try {
      axios
        .get(`/api/stories?filter=${sortType}`)
        .then(({ data }) => setStories(data))
        .then(() => {
          setIsLoading(false);
        });
    } catch (err) {
      toast.error('Не удалось загрузить записи');
      setIsLoading(false);
    }
  }, [sortType]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StoriesSwiper />

          <div className="flex items-center justify-between">
            <h1 className="text-gray-800 md:text-[42px] text-2xl my-4">
              Истории Бессмертного полка
            </h1>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="p-2 focus:outline-none border-2 border-neutral-300 rounded-lg"
            >
              <option value="asc">Убывание</option>
              <option value="desc">Возрастание</option>
              <option value="alfbate">Алфавит (а-я)</option>
              <option value="descAlfbate">Алфавит (я-а)</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-normal justify-center">
            {stories.map((story: Stories) => (
              <StoryCard
                id={story.id}
                name={story.name}
                subname={story.subname}
                subsubname={story.subsubname}
                photo={!story.photo ? null : (story.photo as string)}
                key={story.id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default StoriesBlock;
