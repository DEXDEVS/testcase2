import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetLineChartDataQuery } from '../../../features/dashboard/dashboardApi';
import { forceDashboardRefetch } from '../../../features/dashboard/dashboardSlice';
import cn from '../../../lib/cn';
import ProductTypeIcon from '../../icons/ProductTypeICon';

const colors = {
  'ארון קיר': '#00BFFF',
  'ארון רחצה': '#FF7F50',
  'חיפוי קיר': '#3CB371',
  מזנון: '#DA70D6',
  מטבח: '#DAA520',
};

const CustomActiveDot = (props) => {
  const { cx, cy } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill='#FFFFFF' />
      <circle cx={cx} cy={cy} r={4} fill='#000000' />
    </g>
  );
};
const renderLegend = (props) => {
  const { payload } = props;

  return (
    <ul
      style={{ listStyleType: 'none', padding: 0, direction: 'rtl' }}
      className='flex justify-end'
    >
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{ display: 'flex', alignItems: 'center', margin: '0 7px' }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: entry.color,
              marginLeft: 7, // Adjust the margin as needed for RTL
            }}
          ></div>
          <span>{entry.value}</span>
          <ProductTypeIcon
            type={entry.value}
            className='w-9 h-9 bg-[#00a6ff27] flex items-center justify-center text-[#00A5FF] mr-2 p-[8px] rounded-full'
          />
        </li>
      ))}
    </ul>
  );
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#f4faff',
          border: '1px solid #d3e1ff',
          padding: '10px',
          borderRadius: '5px',
          textAlign: 'right', // Align text to the right
          direction: 'rtl', // Set text direction to RTL
        }}
      >
        <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>
          {payload[0]?.payload?.date}
        </p>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: entry.color,
                marginLeft: 5, // Adjust the margin as needed for RTL
              }}
            ></div>
            <p
              style={{ margin: 0, fontSize: '12px', color: '#333' }}
            >{`${entry.name} ${entry.value} `}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
export default function LineChartComponent({ className, dateRange }) {
  const { start, end, days } = dateRange || {};
  const isRefetch = useSelector((state) => state.dashboard.isRefetch);
  const { data, isLoading, isError, refetch, isUninitialized } =
    useGetLineChartDataQuery(
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

  let chartData = [];
  let productTypes = [];
  if (!isLoading && !isError && data && data?.data) {
    const { lineChartData, productTypes: responseProductTypes } =
      data.data || {};
    chartData = lineChartData;
    productTypes = responseProductTypes;
  }

  return (
    <div className={cn('relative', className)}>
      <h3 className='text-xl font-semibold absolute top-11 right-14' dir='rtl'>
        ⁠תוכניות לפי סוג
      </h3>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 10, left: 5, bottom: 10 }}
        >
          <CartesianGrid
            horizontal={true}
            vertical={false}
            strokeDasharray='3 3'
          />

          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey='day'
            padding={{ left: 8, right: 8 }}
          />
          <YAxis axisLine={false} tickLine={false} />
          {/* <Tooltip cursor={{ stroke: "#E5E5E5", strokeWidth: 50 }} /> */}
          <Tooltip content={<CustomTooltip />} cursor={{ strokeWidth: 15 }} />
          <Legend
            content={renderLegend}
            verticalAlign='top'
            align='left'
            height={60}
          />
          {productTypes.map((p, idx) => (
            <Line
              key={idx}
              type='monotone'
              dataKey={p}
              stroke={colors[p]}
              strokeWidth={4}
              dot={data?.length === 0}
              activeDot={<CustomActiveDot />}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
