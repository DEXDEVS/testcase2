import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import React, { useMemo } from 'react';
import { useDrawer } from '../../../Drawer/Drawer';
import Item from './Item';

export default function ListItem({ info, cards }) {
  const { title, statusTxtColor, statusTxtColorBg, status } = info || {};

  const { handleDrawerToggle } = useDrawer();

  const cardIds = useMemo(() => {
    return cards.map((c) => c.id);
  }, [cards]);

  const { isOver, setNodeRef } = useDroppable({
    id: status,
    data: {
      type: 'column',
    },
    disabled: cards.length > 1,
  });
  const style = {};
  const totalCards = cards.length;
  return (
    <div className='' dir='rtl'>
      <h3 className='text-black text-3xl font-semibold mb-4 mt-2'>
        <span
          className='inline-block px-3 py-1 rounded'
          style={{ backgroundColor: statusTxtColor }}
        >
          {title}
        </span>
      </h3>
      <div
        ref={setNodeRef}
        style={style}
        className='bg-white rounded-md shadow-md min-h-[140px] max-h-full'
      >
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
            <SortableContext items={cardIds}>
              {cards.map((card, idx) => (
                <Item
                  handleDrawerToggle={handleDrawerToggle}
                  key={idx}
                  card={card}
                  statusTxtColor={statusTxtColor}
                  statusTxtColorBg={statusTxtColorBg}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </div>
  );
}
