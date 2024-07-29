import React from 'react';
import ErrorModal from './ErrorModal';
import LoadingModal from './LoadingModal';
import SuccessModal from './SuccessModal';

const ModalsContainer = () => {
  return (
    <>
      <LoadingModal />
      <SuccessModal />
      <ErrorModal />
    </>
  );
};

export default ModalsContainer;
