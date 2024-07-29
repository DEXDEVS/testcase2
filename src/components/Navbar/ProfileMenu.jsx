import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../../features/auth/authApi';
import ArchivesIcon from '../icons/ArchivesIcon';

const ProfileMenu = () => {
  const { name, avatar } = useSelector((state) => state.auth.user) || {};
  const [logout, { isLoading, isError, isSuccess }] = useLogoutMutation();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className='dropdown dropdown-end'>
      <span
        tabIndex={0}
        role='button'
        className='btn btn-ghost rounded-btn px-1.5 hover:bg-base-content/20'
      >
        <div className='flex items-center gap-1 sm:gap-2'>
          <div className='avatar'>
            <div className='w-10 rounded-full'>
              <img alt='User Avatar' src={avatar} />
            </div>
          </div>
          <p className='text-sm/none font-bold text-white'>{name}</p>
        </div>
      </span>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-2 shadow bg-base-100 rounded-box mt-4 w-52 z-20'
        role='menu'
      >
        <li>
          <Link to='/orders/archive'>
            <ArchivesIcon className='w-5 h-5' />
            ארכיון
          </Link>
        </li>
        <li>
          <button
            disabled={isLoading}
            onClick={handleLogout}
            className='text-error'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              role='img'
              fontSize='16'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'
            >
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5l-5-5m5 5H9'
              ></path>
            </svg>
            התנתק
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
