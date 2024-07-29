import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEditCardMutation } from '../../../features/cards/cardsApi';
import { updateDraggableCards } from '../../../features/cards/cardsSlice';
import GridView from '../GridView/GridView';
import ListView from '../ListView/ListView';

export default function DragAndDrop({ isListView, cards }) {
  const [draggableCards, setDraggableCards] = useState(cards);
  const isUpdateDraggabeCards = useSelector(
    (state) => state.cards.isUpdateDraggabeCards
  );
  const dispatch = useDispatch();
  const [activeCard, setActiveCard] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const [editCard] = useEditCardMutation();

  useEffect(() => {
    if (isUpdateDraggabeCards) {
      setDraggableCards(cards);
      dispatch(updateDraggableCards(false));
    }
  }, [isUpdateDraggabeCards]);
  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        {!isListView ? (
          <GridView draggableCards={draggableCards} activeCard={activeCard} />
        ) : (
          <ListView draggableCards={draggableCards} activeCard={activeCard} />
        )}
      </DndContext>
    </>
  );
  function onDragStart(event) {
    if (event.active.data.current?.type === 'card') {
      setActiveCard(event.active.data.current.card);
    }
  }
  function onDragEnd(event) {
    setActiveCard(null);

    const { active, over } = event;
    if (!over) return;

    const isActiveACard = active.data.current?.type === 'card';
    const isOverACard = over.data.current?.type === 'card';

    if (!isActiveACard) return;

    const c_id = active.data?.current?.card?.id;
    const originalCard = cards.find((c) => c.id == c_id);
    const currentStatus = originalCard.status;

    if (isActiveACard && isOverACard) {
      const newStatus = over.data?.current?.card?.status;
      if (currentStatus && newStatus) {
        if (currentStatus !== newStatus) {
          const activeId = active.id;
          editCard({
            id: activeId,
            data: { status: newStatus },
          });
        }
      }
    }

    const isOverAColumn = over.data.current?.type === 'column';
    if (isActiveACard && isOverAColumn) {
      const newStatus = over.id;

      if (currentStatus && newStatus) {
        if (currentStatus !== newStatus) {
          const activeId = active.id;
          editCard({
            id: activeId,
            data: { status: newStatus },
          });
        }
      }
    }
  }
  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACard = active.data.current?.type === 'card';
    const isOverACard = over.data.current?.type === 'card';

    if (!isActiveACard) return;

    if (isActiveACard && isOverACard) {
      const activeIndex = draggableCards.findIndex((c) => c.id === activeId);
      const overIndex = draggableCards.findIndex((c) => c.id === overId);

      setDraggableCards((draggableCards) => {
        if (
          draggableCards[activeIndex].status !==
          draggableCards[overIndex].status
        ) {
          const updatedCard = {
            ...draggableCards[activeIndex],
            status: draggableCards[overIndex].status,
          };
          const updatedCards = [
            ...draggableCards.slice(0, activeIndex),
            updatedCard,
            ...draggableCards.slice(activeIndex + 1),
          ];
          return arrayMove(updatedCards, activeIndex, overIndex - 1);
        }

        return arrayMove(draggableCards, activeIndex, overIndex);
      });
    }
    const isOverAColumn = over.data.current?.type === 'column';
    if (isActiveACard && isOverAColumn) {
      setDraggableCards((draggableCards) => {
        const activeIndex = draggableCards.findIndex((c) => c.id === activeId);

        const updatedCard = {
          ...draggableCards[activeIndex],
          status: overId,
        };

        const updatedCards = [
          ...draggableCards.slice(0, activeIndex),
          updatedCard,
          ...draggableCards.slice(activeIndex + 1),
        ];
        return updatedCards;
      });
    }
  }
}
