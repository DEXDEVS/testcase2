import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import React, { useMemo } from 'react';
import DropDownArchivesOrDelete from '../../../Dropdown/DropDownArchivesOrDelete';
import Order from './Order';

export default function GridItem({ info, cards }) {
  const totalCards = cards.length;
  const { bgColor1, bgColor2, circleBgColor, title, status } = info || {};
  const cardIds = useMemo(() => {
    return cards.map((c) => c.id);
  }, [cards]);
  const { isOver, setNodeRef } = useDroppable({
    id: status,
    data: {
      type: 'column',
    },
    disabled: totalCards > 1,
  });
  const style = {
    backgroundColor: bgColor2,
  };

  return (
    <div>
      <div
        className='p-4 pt-1 rounded-md '
        style={{ backgroundColor: `${bgColor1}` }}
      >
        <DropDownArchivesOrDelete status={status} />
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div
              className='h-2 w-2 rounded-full'
              style={{ backgroundColor: `${circleBgColor}` }}
            ></div>
            <h3 className='text-lg font-semibold '>{title}</h3>
          </div>
          <div className='text-xs'>
            {totalCards > 10 ? totalCards : '0' + totalCards} הזמנות
          </div>
        </div>
      </div>
      <div
        ref={setNodeRef}
        style={style}
        className='p-2 flex flex-col gap-4 min-h-24 shadow-sm'
      >
        <SortableContext items={cardIds}>
          {cards.map((card, idx) => (
            <Order card={card} key={idx} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
