import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '../Grid/Grid';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import LineChartComponent from './LIneChartComponent/LineChartComponent';
import NewCustomers from './NewCustomers/NewCustomers';
import Stats from './Stats/Stats';
import TrafficChannels from './TrafficChannels/TrafficChannels';

export default function Dashboard() {
  const dateRange = useSelector((state) => state.dashboard.dateRange);

  return (
    <div className=' bg-[#f7f7f8]'>
      <div dir='rtl' className='pt-6 pr-6'>
        <h2 className='text-base sm:text-3xl lg:text-4xl font-medium mb-2'>
          ברוך שובך, מקס
        </h2>
        <p className='text-sm'>הנה מה שקורה עם החנות שלך היום.</p>
      </div>
      <div className='max-w-[1920px] mx-auto p-6 grid gap-y-5 py-10'>
        <Stats dateRange={dateRange} />
        <HeaderTitle />
        <Grid className=' lg:grid-cols-4'>
          <TrafficChannels dateRange={dateRange} />
          <LineChartComponent
            dateRange={dateRange}
            className='bg-white rounded-md shadow-md lg:col-span-3 w-full h-[400px] sm:h-[530px] sm:p-7 '
          />
        </Grid>
        <NewCustomers />
      </div>
    </div>
  );
}
