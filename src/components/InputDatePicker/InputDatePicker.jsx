import { he } from "date-fns/locale";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "../../lib/cn";
import { commonInputStyle } from "../../lib/commonStyles";

// Register Hebrew locale
registerLocale("he", he);

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
const CustomInput = React.forwardRef(
  ({ value, onClick, labelTxt, className }, ref) => {
    return (
      <input
        dir="rtl"
        type="text"
        name={`${labelTxt}date`}
        value={`${labelTxt + " " + value}`}
        onClick={onClick}
        readOnly
        ref={ref}
        className={cn(commonInputStyle, className, "custom-input-field")}
      />
    );
  }
);
export default function InputDatePicker({
  labelTxt,
  value,
  className,
  ...restProps
}) {
  return (
    <DatePicker
      locale="he"
      selected={value}
      customInput={
        <CustomInput value={value} className={className} labelTxt={labelTxt} />
      }
      renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
        <div>
          <div
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            }
            onClick={increaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
            </span>
          </div>
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString("he-IL", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div
            className={
              "react-datepicker__navigation react-datepicker__navigation--next"
            }
            onClick={decreaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </div>
        </div>
      )}
      dateFormat="d, MMMM"
      {...restProps}
    />
  );
}
