import React from 'react';
import Table from '../components/common/Table';
import Navbar from '../components/Navbar/Navbar';
import {useGetArchivedCardsQuery} from "../features/cards/cardsApi.js";

const Archive = () => {
    const { data, isLoading, isError } = useGetArchivedCardsQuery(undefined, {refetchOnMountOrArgChange:true});
    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>smething went wrong</div>;
    if (!isLoading && !isError && data) {
        const cards = data.data;
        content = <Table cards={cards} listType='archive' />
    }
  return (
    <div className='min-h-screen bg-[#F7F7F8]'>
      <Navbar />
      <div className='py-10'>
        <div className='sm:px-6'>
            {content}
        </div>
      </div>
    </div>
  );
};

export default Archive;
