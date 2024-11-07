import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTotalOrdersCountQuery } from '../../../features/dashboard/dashboardApi';
import { forceDashboardRefetch } from '../../../features/dashboard/dashboardSlice';
import TotalOrdersIcon from '../../icons/TotalOrdersIcon';
import Stat from './Stat';

const Stats = ({ dateRange }) => {
  const { start, end, days } = dateRange || {};
  const isRefetch = useSelector((state) => state.dashboard.isRefetch);
  const { data, isLoading, isError, refetch, isUninitialized } =
    useGetTotalOrdersCountQuery(
      {
        start,
        end,
        days,
      },
      { pollingInterval: 90000, refetchOnMountOrArgChange: true }
    );
  const dispatch = useDispatch();
  let statsData = null;
  if (!isLoading && !isError && data?.data) {
    statsData = data?.data;
  }
  useEffect(() => {
    dispatch(forceDashboardRefetch(false));
  }, []);

  useEffect(() => {
    if (isRefetch && !isUninitialized) {
      console.log(isRefetch);
      refetch();
      dispatch(forceDashboardRefetch(false));
    }
  }, [isRefetch]);

  return (
    <div
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'
      dir='rtl'
    >
      <Stat
        data={{
          title: 'תוכניות בעבודה',
          value: statsData ? statsData.totalCards : 0,
          isMoney: false,
          growthPercentage: '21.9',
          todayStats: '67k',
        }}
      >
        {/* <DollarIcon className="h-5 w-5" /> */}
        <TotalOrdersIcon className='h-5 w-5' />
      </Stat>
      <Stat
        data={{
          title: 'מוכן להתקנה',
          value: statsData ? statsData.readyForInstallment : 0,
          isMoney: false,
          growthPercentage: '5.7',
          todayStats: '5k',
        }}
      >
        <TotalOrdersIcon className='h-5 w-5' />
      </Stat>
      <Stat
        data={{
          title: 'בהתקנה',
          value: statsData ? statsData.inInstallment : 0,
          isMoney: false,
          growthPercentage: '13',
          todayStats: '7k',
        }}
      >
        {/* <VisitorIcon className="h-5 w-5" /> */}
        <TotalOrdersIcon className='h-5 w-5' />
      </Stat>
    </div>
  );
};

export default Stats;
