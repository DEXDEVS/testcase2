import React, {useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';
import SuccessTickIcon from '../icons/SuccessTickIcon';
import TrashIcon from '../icons/TrashIcon';
import {useUploadExcelFileMutation} from "../../features/cards/cardsApi.js";

const UpLoadDropZone = ({ setData, file, setFile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadFile, {data, isLoading, isError, isSuccess}] = useUploadExcelFileMutation()
  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };
  const toggleDropdown = () => {
    setIsOpen((prevValue) => !prevValue);
    setFile(null);
    setData(null);
  };
  const handleRemoveFile = () => {
    setFile(null);
    setData(null);
  };
  const handleClose = () => {
    setIsOpen(false);
    setFile(null);
    setData(null);
  };
  const handleOnclick = (file) => {
    uploadFile(file);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isLoading) {
      document.getElementById('loadingModal').showModal();
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) {
      document.getElementById('loadingModal').close();
      setData(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      document.getElementById('loadingModal').close();
      document.getElementById('ErrorModal').showModal();
      setFile(null);
    }
  }, [isError]);

  return (
    <div className='dropdown'>
      <div
        onClick={toggleDropdown}
        className='flex items-center px-3 py-2 bg-white border-2  border-gray-200 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        <div className='flex items-center gap-2'>
          <span className='text-lg font-bold text-gray-700 hidden sm:block'>
            העלה קובץ
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='100'
            height='100'
            viewBox='0 0 24 24'
            className='w-6 h-6 opacity-70'
          >
            <path
              fillRule='evenodd'
              d='M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z'
            ></path>
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className='bg-white border-dashed border  border-[#E8E8E8] rounded z-[1] w-96 shadow absolute top-full mt-4 left-0'>
          <div className='flex justify-end px-4 pt-2'>
            <button
              onClick={handleClose}
              className='btn btn-sm btn-circle btn-ghost'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <hr className='mx-4 mt-1' />
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className='p-4 cursor-pointer' {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className='flex items-center gap-4'>
                    <button className='btn btn-outline border-gray-300'>
                      בחר קבצים
                    </button>
                    <svg
                      width='26'
                      height='18'
                      viewBox='0 0 20 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M16.125 5.36668C15.5583 2.49168 13.0333 0.333344 10 0.333344C7.59167 0.333344 5.5 1.70001 4.45833 3.70001C1.95 3.96668 0 6.09168 0 8.66668C0 11.425 2.24167 13.6667 5 13.6667H15.8333C18.1333 13.6667 20 11.8 20 9.50001C20 7.30001 18.2917 5.51668 16.125 5.36668ZM11.6667 7.83334V11.1667H8.33333V7.83334H5.83333L9.70833 3.95834C9.875 3.79168 10.1333 3.79168 10.3 3.95834L14.1667 7.83334H11.6667Z'
                        fill='#969696'
                      />
                    </svg>
                    <span>זרוק קבצים כאן...</span>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          <hr className='mb-3 mx-4' />
          {file && (
            <>
              <div className='px-4 pb-4 flex justify-between'>
                <div className='flex items-center gap-1'>
                  <span className='text-[#969696]'>{file.name}</span>
                  <SuccessTickIcon className='w-4 h-4 text-[#0085FF]' />
                </div>
                <div onClick={handleRemoveFile} className='cursor-pointer'>
                  <TrashIcon className='w-5 h-5' />
                </div>
              </div>
              <div className='px-4 pb-2'>
                <button
                  onClick={() => handleOnclick(file)}
                  className='btn px-12 btn-primary text-white text-sm font-semibold '
                >
                  שלח
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UpLoadDropZone;
