import React from 'react';
import { useGetArchivedCardsQuery } from '../../features/cards/cardsApi';
import TableItem from './TableItem';

const Table = () => {
  const { data, isLoading, isError } = useGetArchivedCardsQuery();
  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>smething went wrong</div>;
  if (!isLoading && !isError && data) {
    const cards = data.data;
    content = (
      <table className='table table-lg transition ease-in delay-500'>
        {/* head */}
        <thead>
          <tr className='text-[#2e2c34e7] text-xl'>
            <th>מספר הזמנה</th>
            <th>סוג</th>
            <th>⁠שם לקוח</th>
            <th>⁠דדליין</th>
            <th>מספר טלפון</th>
            <th>כתובת</th>
            <th>סטטוס</th>
            <th>ערוך</th>
          </tr>
        </thead>
        <tbody className='bg-base-100'>
          {cards.map((card) => (
            <TableItem key={card.id} card={card} />
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className='' dir='rtl'>
      <h3 className='text-[#2E2C34] text-2xl font-semibold mb-4 mt-2'>
        ארכיון
      </h3>
      <div className='bg-white rounded-md shadow-md min-h-[130px]'>
        {content}
      </div>
    </div>
  );
};

export default Table;
