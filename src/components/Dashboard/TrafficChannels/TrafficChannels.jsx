import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPieChartDataQuery } from '../../../features/dashboard/dashboardApi';
import { forceDashboardRefetch } from '../../../features/dashboard/dashboardSlice';
import PieChartComponent from '../PieChartComponent/PieChartComponent';

export default function TrafficChannels({ dateRange }) {
  const { start, end, days } = dateRange || {};
  const isRefetch = useSelector((state) => state.dashboard.isRefetch);
  const { data, isLoading, isError, refetch, isUninitialized } =
    useGetPieChartDataQuery(
      {
        start,
        end,
        days,
      },
      { pollingInterval: 90000, refetchOnMountOrArgChange: true }
    );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(forceDashboardRefetch(false));
  }, []);

  useEffect(() => {
    if (isRefetch && !isUninitialized) {
      refetch();
      dispatch(forceDashboardRefetch(false));
    }
  }, [isRefetch]);

  let content = null;
  if (!isLoading && !isError && data && data?.data && data.data?.length === 0) {
    content = <p>NO data available to show</p>;
  }
  if (!isLoading && !isError && data && data?.data && data.data?.length > 0) {
    const chartData = data.data;
    content = (
      <PieChartComponent
        className=' w-full h-[300px] sm:h-[430px]'
        data={chartData}
      />
    );
  }
  const handleOnchange = () => {};
  return (
    <div
      dir='rtl'
      className='lg:col-span-1 rounded-md shadow-md  bg-white h-[400px] sm:h-[530px] p-4'
    >
      <h3 className='font-semibold text-lg'>ערוצי תנועה</h3>
      <div role='tablist' className='tabs tabs-bordered '>
        <input
          type='radio'
          name='my_tabs_1'
          role='tab'
          className='tab'
          aria-label='את כל'
          defaultChecked
          onChange={handleOnchange}
        />
        <div dir='ltr' role='tabpanel' className='tab-content'>
          {content}
        </div>

        {/* <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="ישיר"
        />
        <div role="tabpanel" className="tab-content ">
          <PieChartComponent
            className=" w-full h-[300px] sm:h-[380px]"
            data={data02}
          />
        </div> */}
      </div>
    </div>
  );
}
