import React from 'react';
import Link from 'next/link';

import { Logo } from '@/components/Header';
import getStoriesCount from '@/libs/getStoriesValue';

export default async function Home() {
  const storiesData: Promise<number> = getStoriesCount();
  const storiesCount = await storiesData;

  return (
    <section className="flex flex-col items-center justify-between xl:p-0 p-4">
      <div className="lx:w-[600px] w-[300px]">
        <Logo />
      </div>
      <hr className="lx:w-[600px] w-full mt-2 border-black" />
      <div className="my-2 text-gray-800 hover:text-gray-600 transition">
        <Link href={'/stories'} className="flex flex-col text-center md:text-3xl text-2xl">
          <span className="text-3xl md:text-[56px] md:leading-[56px]">
            {storiesCount === undefined ? '...' : storiesCount}
          </span>
          <span>имён в летописи</span>
        </Link>
      </div>
      <hr className="lx:w-[600px] w-full mb-4 border-black" />
      <p className="mb-6">
        Мы чтим и бережно храним память о подвиге наших дедов и прадедов, бабушек и прабабушек.
        Расскажите о своем герое и примите участие в шествии Бессмертного полка средней школы № 2
        онлайн.
      </p>
      <p>
        Материалы для размещения на сайте Бессмертного полка школы присылайте на электронную почту{' '}
        <Link href={'mailto:school2-vzm@yandex.ru'}> school2-vzm@yandex.ru</Link>, указав в теме
        письма &quot;Бессмертный полк&quot;.
      </p>
    </section>
  );
}
