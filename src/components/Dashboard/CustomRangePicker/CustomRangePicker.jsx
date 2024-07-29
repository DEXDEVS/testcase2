import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { updateDateRange } from "../../../features/dashboard/dashboardSlice";

const CustomRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        updateDateRange({
          start: startDate.toString(),
          end: endDate.toString(),
          days: null,
        })
      );
    }
  }, [startDate, endDate]);
  return (
    <div dir="ltr" className="flex items-center gap-3">
      <div>
        <span className="mr-1">from: </span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
        <span className="mr-1">to:</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
        />
      </div>
    </div>
  );
};

export default CustomRangePicker;
