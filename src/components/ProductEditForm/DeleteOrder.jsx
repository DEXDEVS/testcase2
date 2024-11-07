import React from 'react';
import trashIcon from '../../assets/icons/trash-icon.svg';
import { useMoveToTrashMutation } from '../../features/cards/cardsApi';

const DeleteOrder = ({ isModal, cardID, handleDrawerClose }) => {
  const [moveToTrash, { isLoading, isError, isSuccess }] =
      useMoveToTrashMutation();
  const handleMoveToTrashOrder = (cardID) => {
    if (cardID) {
      moveToTrash(cardID);
      if (isModal) {
        document.getElementById('productEditModal').close();
      } else {
        handleDrawerClose();
      }
    }
  };
  return (
    <span
      onClick={() => handleMoveToTrashOrder(cardID)}
      className='tooltip cursor-pointer'
      data-tip='למחוק'
    >
      <img src={trashIcon} alt='delete' width={18} />
    </span>
  );
};

export default DeleteOrder;
