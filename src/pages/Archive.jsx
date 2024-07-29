import React from 'react';
import Table from '../components/Archive/Table';
import Navbar from '../components/Navbar/Navbar';

const Archive = () => {
  return (
    <div className='min-h-screen bg-[#F7F7F8]'>
      <Navbar />
      <div className='py-10'>
        <div className='sm:px-6'>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Archive;
