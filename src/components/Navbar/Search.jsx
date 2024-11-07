import React, { useState } from 'react';
import SearchModal from './SearchModal';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnclick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <button
        onClick={handleOnclick}
        className='btn hidden bg-white h-10 w-10 items-center justify-start   sm:flex btn-sm px-2'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          role='img'
          className='text-[#0C0C0C] w-full h-full'
          fontSize='15'
          viewBox='0 0 24 24'
        >
          <g
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
          >
            <circle cx='11' cy='11' r='8'></circle>
            <path d='m21 21l-4.3-4.3'></path>
          </g>
        </svg>
      </button>
      {isOpen && <SearchModal setIsOpen={setIsOpen} />}
    </>
  );
};

export default Search;
