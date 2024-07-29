import React, { useEffect, useRef, useState } from 'react';
import cn from '../../lib/cn';
import ProductTypeIcon from '../icons/ProductTypeICon';

const Dropdown = ({
  fieldItems: items,
  setValue,
  getValues,
  fieldName,
  isModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleOnclick = (fieldName, item) => {
    if (fieldName === 'type') {
      setValue(fieldName, { ...getValues()[fieldName], name: item });
      setIsOpen(false);
    } else {
      setValue(fieldName, item);
      setIsOpen(false);
    }
  };

  return (
    <div className='relative w-full' ref={dropdownRef}>
      <div
        className={cn(
          'w-full select select-bordered font-medium bg-[#F2F9FD] border-[#ebeaed] border-2 shadow-sm flex items-center',
          {
            'bg-white text-[#00A5FF] border-[#00A5FF]': isOpen,
            'pr-5 flex gap-[6px]': fieldName === 'type',
          }
        )}
        onClick={toggleDropdown}
      >
        {fieldName === 'type' && (
          <ProductTypeIcon
            type={getValues()[fieldName]?.name}
            className='w-7 h-7 bg-[#00a6ff27] p-[6px] rounded-full flex items-center justify-center text-[#00A5FF]'
          />
        )}
        <span>
          {fieldName === 'type'
            ? getValues()[fieldName]?.name
            : getValues()[fieldName]}
        </span>
      </div>
      {isOpen && (
        <ul className='absolute z-10 w-full bg-white border-[#ebeaed] border-2 shadow-lg rounded-md mt-3 px-3 py-4 flex flex-col gap-3'>
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(
                'p-2 border border-[#ebeaed] group hover:bg-[#D2EFFF] hover:text-[#00A5FF] font-medium rounded-md shadow-sm cursor-pointer',
                {
                  'bg-[#D2EFFF] text-[#00A5FF]':
                    item === getValues()[fieldName] ||
                    (fieldName === 'type' &&
                      item === getValues()[fieldName]?.name),
                  'flex flex-row gap-[6px] items-center': fieldName === 'type',
                }
              )}
              onClick={() => handleOnclick(fieldName, item)}
            >
              {fieldName === 'type' && (
                <ProductTypeIcon
                  type={item}
                  className={cn(
                    'w-7 h-7 bg-[#EAE9EC] group-hover:bg-[#00a6ff27] p-[6px] rounded-full flex items-center justify-center',
                    {
                      'bg-[#00a6ff27]': item === getValues()[fieldName]?.name,
                    }
                  )}
                />
              )}
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
