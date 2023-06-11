'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import Loader from '@/components/Loader';
import { Stories } from '@prisma/client';

const Story = () => {
  const [story, setStory] = React.useState<Stories>();
  const [isLoading, setIsLoading] = React.useState(true);
  const { storyId } = useParams();

  React.useEffect(() => {
    axios
      .get(`/api/stories/${storyId}`)
      .then((res) => {
        setStory(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error('Не удалось загрузить запись');
      });
  }, [storyId]);

  const formatedCreationDate = React.useMemo(() => {
    if (!story?.createdAt) {
      return null;
    }

    const convertedCreationDate = new Date(story?.createdAt);

    return format(convertedCreationDate, 'H:mm, PP', { locale: ruLocale });
  }, [story?.createdAt]);

  return (
    <section className="flex flex-col mt-10">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex gap-4">
            <div className="h-[300px] w-[260px] flex items-center relative mb-6">
              <Image
                src={(story?.photo as string) || '/wp11270135.png'}
                alt="photo"
                className="object-cover rounded-lg"
                fill
              />
            </div>
            <div>
              <h1 className="text-[50px] leading-none">{story?.name}</h1>
              <h1 className="text-[50px] leading-none">{story?.subname}</h1>
              <h1 className="text-[50px] leading-none">{story?.subsubname}</h1>
            </div>
          </div>
          <div>
            <p>{story?.info}</p>
          </div>
          <p className="mt-10 text-gray-500 text-xs text-center">
            История добавлена {formatedCreationDate}
          </p>
        </>
      )}
    </section>
  );
};

export default Story;
