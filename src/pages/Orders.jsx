import { useState } from 'react';
import Drawer from '../components/Drawer/Drawer';
import Navbar from '../components/Navbar/Navbar';
import StoreManagement from '../components/StoreManagement/StoreManagement';

export default function Orders() {
  const [isListView, setListView] = useState(false);

  const toggleLayout = () => {
    setListView(!isListView);
  };
  return (
    <Drawer>
      <Navbar isListView={isListView} toggleLayout={toggleLayout} />
      <StoreManagement isListView={isListView} />
    </Drawer>
  );
}
