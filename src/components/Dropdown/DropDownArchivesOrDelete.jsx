import React, { useEffect, useRef, useState } from 'react';
import {
  useMoveToTrashByStatusMutation,
  useMoveCardListToArchiveMutation
} from '../../features/cards/cardsApi';
import cn from '../../lib/cn';

const DropDownArchivesOrDelete = ({ status, totalCards }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [moveCardlistToArchive, { isLoading, isError, isSuccess }] =
    useMoveCardListToArchiveMutation();
  const [moveCardListToTrash] = useMoveToTrashByStatusMutation();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteAll = (status) => {
    if(totalCards>0){
      moveCardListToTrash(status);
      setIsOpen(false);
    }
  };
  const handleMoveToArchiveAll = (status) => {
    if(totalCards>0){
      moveCardlistToArchive(status);
      setIsOpen(false);
    }
  };
  return (
    <div className='w-full relative' ref={dropdownRef}>
      <div className='text-end'>
        <span className='cursor-pointer' onClick={toggleDropdown}>
          ...
        </span>
      </div>
      <ul
        dir='rtl'
        className={cn(
          'hidden bg-white border-[#ebeaed] border-2 shadow-lg rounded-md px-2 py-3',
          {
            'absolute left-auto flex flex-col gap-2 z-20 w-full ': isOpen,
          }
        )}
      >
        <li
          className={cn(
            'p-1 border border-[#ebeaed] group text-error hover:bg-error hover:text-white font-medium rounded-md shadow-sm cursor-pointer'
          )}
          onClick={() => handleDeleteAll(status)}
        >
          למחוק הכל
        </li>
        <li
          className={cn(
            'p-1 border border-[#ebeaed] group hover:bg-[#D2EFFF] hover:text-[#00A5FF] font-medium rounded-md shadow-sm cursor-pointer'
          )}
          onClick={() => handleMoveToArchiveAll(status)}
        >
          להעביר הכל לארכיון
        </li>
      </ul>
    </div>
  );
};

export default DropDownArchivesOrDelete;
