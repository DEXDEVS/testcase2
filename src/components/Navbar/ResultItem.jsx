import React from 'react';
import { useDispatch } from 'react-redux';
import { addEditCardData } from '../../features/cards/cardsSlice';

const ResultItem = ({ card }) => {
  const dispatch = useDispatch();
  const handleClickItem = (card) => {
    dispatch(addEditCardData({ ...card }));
    document.getElementById('productEditModal').showModal();
  };
  return (
    <tr onClick={() => handleClickItem(card)} className='hover cursor-pointer'>
      <td>{card['order']['orderNumber']}</td>
      <td>{`${card['type']['name']} ${card['type']['typeID']}`}</td>
      <td>{card['client']['name']}</td>
      <td>{card['status']}</td>
    </tr>
  );
};

export default ResultItem;
