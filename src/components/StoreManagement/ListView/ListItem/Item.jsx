import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import editIcon from '../../../../assets/icons/edit.svg';
import { useEditCardMutation } from '../../../../features/cards/cardsApi';
import useIsMobile from '../../../../hooks/useIsMobile';
import { stringToFormattedDate } from '../../../../lib/dateFormatter';
import { productTypesIcon, statuses } from '../../../../lib/staticData';
import DropdownListView from '../../../Dropdown/DropdownLisView';

const Item = ({
  card,
  statusTxtColor,
  statusTxtColorBg,
  handleDrawerToggle,
  isDragOverlay,
}) => {
  const { status, id, client, dueDate, type, cardNumber, address, order } =
    card || {};
  const isMobile = useIsMobile();
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: 'card',
      card,
    },
    disabled: isMobile,
  });
  const style = {
    transition: transition || 'transform 500ms ease',
    transform: CSS.Transform.toString(transform),
  };

  const [editCard, { isLoading, isError, isSuccess }] = useEditCardMutation();

  const handleStatusChange = (newStatus, id, currentStatus) => {
    if (currentStatus !== newStatus) {
      const data = {
        ...card,
        status: newStatus,
      };
      editCard({ id, data });
    }
  };

  const addressFormat = address?.street + '  ' + address?.city;
  if (isDragging) {
    return (
      <tr className='opacity-30 bg-base-100 h-[80px] border-2  border-dashed border-gray-300'></tr>
    );
  }
  if (isDragOverlay)
    return (
      <div dir='rtl' className='bg-white rounded-md shadow-md '>
        <table className='table'>
          <tbody>
            <tr
              ref={setNodeRef}
              style={style}
              {...attributes}
              {...listeners}
              className='bg-base-100 cursor-grabbing'
              dir='rtl'
            >
              <th>{cardNumber}</th>
              <td>
                <div className='w-8 p-2 bg-[#E5F6FF] rounded-full'>
                  <img
                    className='w-full'
                    src={productTypesIcon[type.name]}
                    alt='type'
                  />
                </div>
              </td>
              <td>{client?.name}</td>
              <td>{stringToFormattedDate(dueDate)}</td>
              <td dir='ltr'>{client?.phone1}</td>
              <td>{address?.street + address?.city}</td>
              <td>
                <div className='py-2 pr-2 text-sm font-medium'>{status}</div>
              </td>
              <td>
                <span onClick={() => handleDrawerToggle(card)}>
                  <img
                    className='mr-4 cursor-pointer'
                    src={editIcon}
                    alt='type'
                  />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='bg-base-100 cursor-grab'
      dir='rtl'
    >
      <th>{`${order?.orderNumber} (${type?.name} ${type?.typeID})`}</th>
      <td>
        <div className='w-8 p-2 bg-[#E5F6FF] rounded-full'>
          <img
            className='w-full'
            src={productTypesIcon[type.name]}
            alt='type'
          />
        </div>
      </td>
      <td>{client?.name}</td>
      <td>{stringToFormattedDate(dueDate)}</td>
      <td dir='ltr'>{client?.phone1}</td>
      <td>{addressFormat}</td>
      <td>
        <DropdownListView
          style={{
            color: statusTxtColor,
            backgroundColor: statusTxtColorBg,
          }}
          fieldItems={statuses}
          id={id}
          status={status}
          handleStatusChange={handleStatusChange}
        />
      </td>
      <td>
        <span onClick={() => handleDrawerToggle(card)}>
          <img
            className='mr-4 cursor-pointer p-[3px]'
            src={editIcon}
            alt='type'
          />
        </span>
      </td>
    </tr>
  );
};

export default React.memo(Item);
