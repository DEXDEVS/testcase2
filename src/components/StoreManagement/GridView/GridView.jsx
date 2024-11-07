import { DragOverlay } from '@dnd-kit/core';
import React from 'react';
import { createPortal } from 'react-dom';
import { columns } from '../../../lib/staticData';
import Grid from '../../Grid/Grid';
import GridItem from './GridItem/GridItem';
import Order from './GridItem/Order';

const GridView = ({ draggableCards, activeCard }) => {
  return (
    <>
      <Grid
        className='sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'
        dir='rtl'
      >
        {columns.map((col, idx) => (
          <GridItem
            key={col.status}
            info={col}
            cards={draggableCards.filter((c) => c.status === col.status)}
          />
        ))}
        {createPortal(
          <DragOverlay>
            {/* overlay document here  */}
            {activeCard && <Order card={activeCard} />}
          </DragOverlay>,
          document.body
        )}
      </Grid>
    </>
  );
};
export default React.memo(GridView);
