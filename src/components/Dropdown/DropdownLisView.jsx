import React, { useEffect, useRef, useState } from "react";
import cn from "../../lib/cn";

const DropdownListView = ({
  fieldItems: items,
  id,
  status,
  handleStatusChange,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOnclick = (item, id, status) => {
    setIsOpen(false);
    handleStatusChange(item, id, status);
  };

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <div
        className={cn(
          "w-full select select-bordered font-medium border-[#ebeaed] border-2 shadow-sm flex items-center",
          {
            "text-[#00A5FF] border-[#00A5FF]": isOpen,
          }
        )}
        style={style}
        onClick={toggleDropdown}
      >
        <span>{status}</span>
      </div>
      <ul
        className={cn(
          "hidden bg-white border-[#ebeaed] border-2 shadow-lg rounded-md mt-3 px-3 py-4",
          {
            "absolute left-auto flex flex-col gap-3 z-10 w-full ": isOpen,
          }
        )}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              "p-2 border border-[#ebeaed] group hover:bg-[#D2EFFF] hover:text-[#00A5FF] font-medium rounded-md shadow-sm cursor-pointer"
            )}
            style={status === item ? style : null}
            onClick={() => handleOnclick(item, id, status)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownListView;
