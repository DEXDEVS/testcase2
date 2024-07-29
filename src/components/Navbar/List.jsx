import React, { useState } from 'react';
import {
  useGetActivitiesQuery,
  useGetMoreActivitiesQuery,
} from '../../features/activities/activities';
import { formatActivityDate } from '../../lib/dateFormatter';

const List = ({ setIsOpen }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetActivitiesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: moreActivity } = useGetMoreActivitiesQuery(page, {
    skip: page <= 1,
    refetchOnMountOrArgChange: true,
  });
  const handleCloseDropdown = () => {
    setIsOpen(false);
    document.getElementById('activityDropdown').removeAttribute('open');
  };
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>Something went wrong!</div>;
  if (!isLoading && !isError && data && data.data?.length > 0) {
    content = (
      <>
        {data.data.map((activity, idx) => {
          const { user, action, cardNumbers, desc } = activity;
          return (
            <div
              key={idx}
              className='my-0.5 flex items-start cursor-pointer gap-3 rounded-box p-1.5 transition-all hover:bg-base-content/5'
            >
              <img
                alt=''
                width='128'
                height='128'
                className='size-9 bg-base-content/10 p-0.5 mask mask-circle'
                src={user.avatar}
                style={{ color: 'transparent' }}
              />

              <div className='grow'>
                <p className='text-sm'>
                  <span dir='ltr' className='text-blue-700'>
                    {user['name']}
                  </span>
                  <span dir='ltr'>{action} </span>
                  <span dir='ltr'>{cardNumbers} </span>
                  <span>{desc} </span>
                </p>
                <p className='text-xs text-base-content/60' dir='rtl'>
                  {formatActivityDate(activity.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
        {page < data.totalPages && (
          <div className='flex justify-center mt-3'>
            <button onClick={loadMore} className='btn'>
              Load More
            </button>
          </div>
        )}
      </>
    );
  }
  return (
    <ul
      tabIndex={0}
      className='dropdown-content menu bg-base-100 rounded-box card card-compact m-1 mt-2 w-96 p-3 shadow z-20'
      role='menu'
    >
      <div className='flex items-center justify-between px-2'>
        <p className='text-base font-medium'>Activity</p>
        <div
          onClick={handleCloseDropdown}
          className='btn gap-2 btn-sm btn-circle btn-ghost'
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
              d='M18 6L6 18M6 6l12 12'
            ></path>
          </svg>
        </div>
      </div>
      <div className='mt-3 overflow-y-scroll max-h-[400px]'>{content}</div>
    </ul>
  );
};

export default List;
