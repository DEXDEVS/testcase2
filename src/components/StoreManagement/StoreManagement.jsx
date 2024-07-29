import React from 'react';
import { useGetCardsQuery } from '../../features/cards/cardsApi';
import ColumnsSkeleton from '../Skeletons/ColumnsSkeleton';
import DragAndDrop from './DragAndDrop/DragAndDrop';

export default function StoreManagement({ isListView }) {
  const { data, isLoading, isError } = useGetCardsQuery(undefined, {
    pollingInterval: 90000,
    refetchOnMountOrArgChange: true,
  });

  let content = null;
  if (isLoading) content = <ColumnsSkeleton />;
  if (!isLoading && isError) content = <p>something went wrong</p>;
  if (!isLoading && !isError && data && data?.data) {
    content = <DragAndDrop isListView={isListView} cards={data.data} />;
  }
  return <div className='bg-[#F7F7F8] p-10 min-h-screen'>{content}</div>;
}
