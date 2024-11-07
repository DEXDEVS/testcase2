import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDateRange } from "../../../features/dashboard/dashboardSlice";
import {
  getCurrentMonthRange,
  getLastMonthRange,
} from "../../../lib/calculateDateRange";
import cn from "../../../lib/cn";
import CustomRangePicker from "../CustomRangePicker/CustomRangePicker";

const options = [
  { label: "החודש", value: "thisMonth" },
  { label: "חודש שעבר", value: "lastMonth" },
  { label: "30 ימים אחרונים", value: 30 },
  { label: "60 ימים אחרונים", value: 60 },
  { label: "90 ימים אחרונים", value: 90 },
  { label: "בחר טווח", value: "custom" },
];

export default function HeaderTitle() {
  const [selectedOption, setSelectedOption] = useState({
    label: "30 ימים אחרונים",
    value: 30,
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    if (option.value !== "custom") {
      if (option.value === "thisMonth") {
        const { startOfMonth, currentDate } = getCurrentMonthRange();
        dispatch(
          updateDateRange({
            start: startOfMonth.toString(),
            end: currentDate.toString(),
            days: null,
          })
        );
      } else if (option.value === "lastMonth") {
        const { startOfLastMonth, endOfLastMonth } = getLastMonthRange();
        dispatch(
          updateDateRange({
            start: startOfLastMonth.toString(),
            end: endOfLastMonth.toString(),
            days: null,
          })
        );
      } else {
        dispatch(
          updateDateRange({ start: null, end: null, days: option.value })
        );
      }
    }
    setSelectedOption(option);
    setIsOpen(false);
  };
  useEffect(() => {
    dispatch(updateDateRange({ start: null, end: null, days: 30 }));
  }, []);

  return (
    <div className="flex justify-end" dir="rtl">
      <div className="relative inline-block text-left z-10" ref={dropdownRef}>
        <div className="flex gap-4 items-center relative">
          {selectedOption.value === "custom" && <CustomRangePicker />}
          <button
            type="button"
            className="btn btn-outline "
            id="options-menu"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            הצג נתונים סטטיסטיים:
            {
              <span className="capitalize font-bold">
                {selectedOption.label}
              </span>
            }
            <svg
              className="ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="absolute z-20 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-full max-w-72 left-0"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <ul className="py-1 text-right" role="none">
              {options.map((option, idx) => (
                <li
                  key={idx}
                  className={cn(
                    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize cursor-pointer",
                    {
                      "font-bold": option.value === selectedOption.value,
                    }
                  )}
                  role="menuitem"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
