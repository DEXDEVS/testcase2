import React from 'react';
import { useMoveSingleCardToArchiveMutation } from '../../features/cards/cardsApi';

const MoveToArchiveOrder = ({ isModal, cardID, handleDrawerClose }) => {
  const [moveCardToArchive, { isLoading, isError, isSuccess }] =
    useMoveSingleCardToArchiveMutation();

  const handleMoveOrderToArchive = (cardID) => {
    if (cardID) {
      moveCardToArchive(cardID);

      if (isModal) {
        document.getElementById('productEditModal').close();
      } else {
        handleDrawerClose();
      }
    }
  };
  return (
    <span
      onClick={() => handleMoveOrderToArchive(cardID)}
      className='tooltip cursor-pointer'
      data-tip='להעביר לארכיון'
    >
      <img src='/archive.png' alt='archive' width={18} />
    </span>
  );
};

export default MoveToArchiveOrder;
