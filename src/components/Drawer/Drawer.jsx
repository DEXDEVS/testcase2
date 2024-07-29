import React, { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addEditCardData,
  removeEditCardData,
} from '../../features/cards/cardsSlice';
import ProductEditForm from '../ProductEditForm/ProductEditForm';

const DrawerContext = createContext();
export const useDrawer = () => useContext(DrawerContext);
export default function Drawer({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerToggle = (card) => {
    dispatch(addEditCardData({ ...card }));
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerClose = () => {
    dispatch(removeEditCardData());
    setIsDrawerOpen(false);
  };
  const handleInputChange = (e) => {};
  return (
    <DrawerContext.Provider
      value={{ isDrawerOpen, handleDrawerToggle, handleDrawerClose }}
    >
      <div className='drawer z-50'>
        <input
          id='my-drawer'
          type='checkbox'
          className='drawer-toggle'
          checked={isDrawerOpen}
          onChange={handleInputChange}
        />
        <div className='drawer-content overflow-auto max-h-full'>
          {/* Page content here */}
          {children}
        </div>
        <div className='drawer-side '>
          <label
            htmlFor='my-drawer'
            className='drawer-overlay'
            onClick={handleDrawerClose}
          ></label>
          <ul className='menu max-w-3xl p-12 min-h-full bg-base-200 text-base-content'>
            {/* Sidebar content here */}
            <ProductEditForm isModal={false} />
          </ul>
        </div>
      </div>
    </DrawerContext.Provider>
  );
}
