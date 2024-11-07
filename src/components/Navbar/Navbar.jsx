import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UploadFileReact from '../UploadFileReact/UploadFileReact';
import Activitites from './Activitites';
import ProfileMenu from './ProfileMenu';
import Search from './Search';

export default function Navbar({ isListView, toggleLayout }) {
  const { pathname } = useLocation();

  return (
    <div className='bg-[#0C0C0C] sm:px-6 py-1 border-b border-base-200 shadow-lg'>
      <div className='navbar z-20  flex justify-between ' dir='rtl'>
        <div className='flex gap-10'>
          <Link to={'/dashboard'}>
            <img src='/logo.png' alt='logo' className='w-32 h-12' />
          </Link>
          <div className='flex items-center gap-6 text-lg'>
            <Link to='/dashboard' className='text-white'>
              דשבורד
            </Link>
            <Link to='/orders' className='text-white'>
              תוכניות
            </Link>
          </div>
        </div>

        <div className='md:gap-4'>
          {/* <UploadFile /> */}
          {isListView !== undefined && pathname === '/orders' && (
            <input
              dir='ltl'
              name='toogleBtn'
              type='checkbox'
              className='toggle toggle-primary'
              checked={isListView}
              onChange={toggleLayout}
            />
          )}

          <UploadFileReact />
          <Search />
          <Activitites />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
