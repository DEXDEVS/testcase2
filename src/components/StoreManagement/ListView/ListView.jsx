import { DragOverlay } from '@dnd-kit/core';
import React from 'react';
import { createPortal } from 'react-dom';
import { listRows } from '../../../lib/staticData';
import Item from './ListItem/Item';
import ListItem from './ListItem/ListItem';

export default function ListView({ draggableCards, activeCard }) {
  return (
    <div className='flex flex-col gap-4'>
      {listRows.map((l) => (
        <ListItem
          key={l.status}
          info={l}
          cards={draggableCards.filter((c) => c.status === l.status)}
        />
      ))}

      {createPortal(
        <DragOverlay>
          {activeCard && <Item card={activeCard} isDragOverlay={true} />}
        </DragOverlay>,
        document.body
      )}
    </div>
  );
}
