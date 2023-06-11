'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';

const SearchForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>();

  const onSearch = (data: FieldValues) => {
    const encodedSearchQuery = encodeURI(data.searchQuery || '');

    router.push(`/stories/search?query=${encodedSearchQuery}`);
  };

  return (
    <form className="flex relative items-center" onSubmit={handleSubmit(onSearch)}>
      <input
        {...register('searchQuery')}
        type="text"
        placeholder="Поиск"
        className="p-2 focus:outline-none border-b border-black bg-transparent w-full"
      />
      <button className="relative right-8 hover:text-gray-600 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchForm;
