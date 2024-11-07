import React from 'react';
import SuccessTickIcon from '../icons/SuccessTickIcon';

const SuccessModal = () => {
  return (
    <dialog id='successModal' className='modal'>
      <div className='modal-box w-96'>
        <div className='flex flex-col justify-center items-center '>
          <span className='w-14 h-14 border border-1 rounded-full flex items-center justify-center p-4 bg-success'>
            <SuccessTickIcon className='text-white' />
          </span>
          <p className='mt-2'>Successfully added</p>
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

export default SuccessModal;
