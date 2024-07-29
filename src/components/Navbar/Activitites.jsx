import React, { useState } from 'react';
import List from './List';

const Activitites = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <details
      id='activityDropdown'
      className='dropdown dropdown-bottom dropdown-end'
    >
      <summary
        tabIndex={0}
        onClick={toggleDropdown}
        className='btn btn-circle btn-ghost btn-sm'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          role='img'
          className='w-full h-full'
          viewBox='0 0 24 24'
        >
          <path
            fill='none'
            stroke='white'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9m4.3 13a1.94 1.94 0 0 0 3.4 0'
          ></path>
        </svg>
      </summary>
      {isOpen && <List setIsOpen={setIsOpen} />}
    </details>
  );
};

export default Activitites;
