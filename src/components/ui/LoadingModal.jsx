import React from 'react';

const LoadingModal = () => {
  return (
    <dialog id='loadingModal' className='modal'>
      <span className='loading loading-spinner loading-lg '></span>
    </dialog>
  );
};

export default LoadingModal;
