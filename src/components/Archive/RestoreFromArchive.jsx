import React from 'react';
import restoreIcon from '../../assets/icons/restore.png';
import { useRestoreCardFromArchiveMutation } from '../../features/cards/cardsApi';

const RestoreFromArchive = ({ id }) => {
  const [restoreCard, { isLoading, isError, isSuccess }] =
    useRestoreCardFromArchiveMutation();
  const handleOnclick = (id) => {
    if (id) {
      restoreCard(id);
    }
  };
  return (
    <button
      disabled={isLoading}
      onClick={() => handleOnclick(id)}
      className='cursor-pointer w-7 h-7'
    >
      <img className='w-full h-full' src={restoreIcon} alt='edit icon' />
    </button>
  );
};

export default RestoreFromArchive;
