import React from 'react';

const ErrorModal = () => {
  return (
    <dialog id='ErrorModal' className='modal'>
      <div className='modal-box w-96'>
        <div className='flex flex-col justify-center items-center '>
          <span className='w-14 h-14 border border-1 rounded-full flex items-center justify-center p-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='text-error'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </span>
          <p className='mt-2'>Something went wrong Please try again</p>
        </div>
        <div className='modal-action'>
          <form method='dialog' className='w-full flex justify-center'>
            <button className='btn'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ErrorModal;
