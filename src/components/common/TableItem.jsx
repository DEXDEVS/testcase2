import React from 'react';
import { stringToFormattedDate } from '../../lib/dateFormatter';
import ProductTypeIcon from '../icons/ProductTypeICon';
import RestoreCard from "./RestoreCard.jsx";

const TableItem = ({ card, listType }) => {
  const { order, dueDate, client, address, type, id } = card;
  return (
    <tr className='bg-base-100' dir='rtl'>
      <th>{`${order?.orderNumber} (${type?.name} ${type?.typeID})`}</th>
      <td>
        <ProductTypeIcon
          type={type?.name}
          className='w-7 h-7 bg-[#00a6ff27] p-[6px] rounded-full flex items-center justify-center text-[#00A5FF]'
        />
      </td>
      <td>{client?.name}</td>
      <td>{stringToFormattedDate(dueDate)}</td>
      <td dir='ltr'>{client?.phone1}</td>
      <td>{address?.street + ' , ' + address?.city}</td>
      <td>ארכיון</td>
      <td>
         <RestoreCard id={id} listType={listType}/>
      </td>
    </tr>
  );
};

export default TableItem;
