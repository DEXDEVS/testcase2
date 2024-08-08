import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetNearestDeadlineOrdersQuery } from '../../../features/dashboard/dashboardApi';
import { forceDashboardRefetch } from '../../../features/dashboard/dashboardSlice';
import { stringToFormattedDate } from '../../../lib/dateFormatter';
import { productTypesIcon, statusesTextColors } from '../../../lib/staticData';

const NewCustomers = () => {
  const isRefetch = useSelector((state) => state.dashboard.isRefetch);
  const { data, isLoading, isError, refetch, isUninitialized } =
    useGetNearestDeadlineOrdersQuery(undefined, {
      pollingInterval: 90000,
      refetchOnMountOrArgChange: true,
    });
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
  if (!isLoading && !isError && data && data?.data) {
    const cards = data.data;
    content = cards.map((card, i) => <Order key={i} card={card} />);
  }
  return (
    <div className='' dir='rtl'>
      <h3 className='text-[#2E2C34] text-2xl font-semibold mb-4 mt-2'>
        לקוחות חדשים
      </h3>
      <div className='overflow-x-auto bg-white rounded-md shadow-md'>
        <table className='table table-lg'>
          {/* head */}
          <thead>
            <tr className='text-[#2e2c34e7] text-xl'>
              <th>מספר הזמנה</th>
              <th>סוג</th>
              <th>לקוח</th>
              <th>כתובת</th>
              <th>דדליין להתקנה</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};

function Order({ card }) {
  const { type, client, address, dueDate, status, orderNumber } = card || {};
  return (
    <tr>
      <th
        style={{ color: statusesTextColors[status] }}
      >{`${orderNumber} (${type?.name} ${type?.typeID})`}</th>
      <td>
        <div className='w-8 p-2 bg-[#E5F6FF] rounded-full'>
          <img
            className='w-full'
            src={productTypesIcon[type?.name]}
            alt='type'
          />
        </div>
      </td>
      <td>{client?.name}</td>
      <td>{address?.street + ' , ' + address?.city}</td>
      <td className='text-red-500'>
        {dueDate && stringToFormattedDate(dueDate)}
      </td>
    </tr>
  );
}

export default React.memo(NewCustomers);
