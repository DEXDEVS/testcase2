import React from 'react';
import trashIcon from '../../assets/icons/trash-icon.svg';
import { useDeleteCardMutation } from '../../features/cards/cardsApi';

const DeleteOrder = ({ isModal, cardID, handleDrawerClose }) => {
  const [deleteCard, { isLoading, isError, isSuccess }] =
    useDeleteCardMutation();
  const handleDeleteOrder = (cardID) => {
    if (cardID) {
      deleteCard(cardID);
      if (isModal) {
        document.getElementById('productEditModal').close();
      } else {
        handleDrawerClose();
      }
    }
  };
  return (
    <span
      onClick={() => handleDeleteOrder(cardID)}
      className='tooltip cursor-pointer'
      data-tip='למחוק'
    >
      <img src={trashIcon} alt='delete' width={18} />
    </span>
  );
};

export default DeleteOrder;
