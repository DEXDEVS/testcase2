import React from 'react';
import TableItem from './TableItem';

const Table = ({cards,listType}) => {

  return (
    <div className='' dir='rtl'>
      <h3 className='text-[#2E2C34] text-2xl font-semibold mb-4 mt-2'>
          {listType === 'trash' ?'Trash':'ארכיון'}
      </h3>
        <div className='bg-white rounded-md shadow-md min-h-[130px]'>
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
                    <TableItem key={card.id} card={card} listType={listType}/>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Table;
