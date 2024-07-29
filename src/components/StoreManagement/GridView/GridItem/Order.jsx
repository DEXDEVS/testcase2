import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { useDispatch } from 'react-redux';
import clockIcon from '../../../../assets/icons/clock.svg';
import { addEditCardData } from '../../../../features/cards/cardsSlice';
import useIsMobile from '../../../../hooks/useIsMobile';
import { stringToFormattedDate } from '../../../../lib/dateFormatter';
import { colors, productTypesIcon } from '../../../../lib/staticData';

const Order = ({ card }) => {
  const { cardNumber, client, dueDate, type, status, order } = card || {};
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

  const dispatch = useDispatch();
  const style = {
    transition: transition || 'transform 500ms ease',
    transform: CSS.Transform.toString(transform),
    border: `2px solid ${colors[status]}`,
  };
  const handleClickOrder = (e, card) => {
    dispatch(addEditCardData({ ...card }));
    document.getElementById('productEditModal').showModal();
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='opacity-30 bg-base-100 h-[136px] rounded-md border-2 border-dashed border-gray-400
      '
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => handleClickOrder(e, card)}
      className='bg-base-100 rounded-md cursor-pointer shadow-sm'
      dir='rtl'
    >
      <div className='card-body p-3 2xl:p-6'>
        <h2 className='card-title text-base font-semibold text-center '>
          <span
            className='inline-block px-3 py-1 rounded-full'
            style={{ backgroundColor: colors[status] }}
          >
            {`${order?.orderNumber} (${type?.name} ${type?.typeID})`}
          </span>
        </h2>
        <div className='flex justify-between gap-1'>
          <div className='flex flex-col gap-2 2xl:gap-3'>
            <p className='text-sm font-medium'>
              {client?.name || 'customer name'}
            </p>
            <div className='flex gap-3 items-center'>
              <img src={clockIcon} alt='clockIcon' className='w-5 h-5' />
              <span className='text-sm font-medium'>
                {` תאריך היעד הוא  ${
                  dueDate && stringToFormattedDate(dueDate)
                }`}
              </span>
            </div>
          </div>
          <div className='flex items-end'>
            <div className='w-9 h-9 p-2 2xl:w-12 2xl:h-12 2xl:p-3 bg-[#E5F6FF]  rounded-full'>
              <img
                className='w-full'
                src={productTypesIcon[type.name]}
                alt='type'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Order);
