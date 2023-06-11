'use client';

import React from 'react';
import Link from 'next/link';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button className="block md:hidden" onClick={() => setIsOpen((prev) => !prev)}>
        <div className="w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </button>
      <div className={`absolute right-0 top-[74px] ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col bg-white border-b-2 border-l-2 border-neutral-300 rounded-bl-lg">
          <Link
            onClick={() => setIsOpen(false)}
            href={'/stories'}
            className="text-sm hover:text-gray-600 hover:underline transition p-3"
          >
            Истории
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href={'/add_new'}
            className="text-sm hover:text-gray-600 hover:underline transition p-3"
          >
            Рассказать историю
          </Link>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
