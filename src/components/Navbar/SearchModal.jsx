import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCardsByClientNameQuery } from '../../features/cards/cardsApi';
import { setSerachResultRefetch } from '../../features/cards/cardsSlice';
import ResultItem from './ResultItem';

const SearchModal = ({ setIsOpen }) => {
  const [clientName, setClientName] = useState('');
  const inputRef = useRef(null);
  const isRefetch = useSelector((state) => state.cards.isRefetch);
  const { data, isLoading, isError, refetch, isUninitialized } =
    useGetCardsByClientNameQuery(clientName, {
      skip: clientName.length <= 0,
      refetchOnMountOrArgChange: true,
    });
  const dispatch = useDispatch();
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const doSearch = (value) => {
    setClientName(value);
  };
  const handleSearch = debounceHandler(doSearch, 500);

  const handleOnclick = () => {
    inputRef.current.value = '';
    setIsOpen(false);
  };
  useEffect(() => {
    setClientName('');
    dispatch(setSerachResultRefetch(false));
  }, []);
  useEffect(() => {
    if (isRefetch && !isUninitialized) {
      refetch();
      dispatch(setSerachResultRefetch(false));
    }
  }, [isRefetch]);
  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>Something went wrong!</p>;
  if (!isLoading && !isError && data && data.length > 0) {
    content = (
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>Order Number</th>
              <th>type</th>
              <th>client name</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((card, idx) => (
              <ResultItem key={idx} card={card} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <dialog id='searchModal' className='modal modal-open'>
      <div className='modal-box absolute top-20 max-w-3xl'>
        <div className='form-control flex-row items-center rounded-box p-2 px-5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            role='img'
            className='text-base-content/70'
            fontSize='18'
            width='1em'
            height='1em'
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
          <input
            ref={inputRef}
            autoFocus={true}
            placeholder='חפש לפי שם לקוח או מספר הזמנה'
            onChange={(e) => handleSearch(e.target.value)}
            className='input w-full text-base focus:border-transparent focus:outline-0 input-sm focus:outline-offset-0'
          />
          <button
            onClick={handleOnclick}
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
          </button>
        </div>
        <div className='border-t border-base-content/10'>
          {clientName && content}
        </div>
      </div>
    </dialog>
  );
};

export default SearchModal;
