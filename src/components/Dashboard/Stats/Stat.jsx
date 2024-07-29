import React from "react";

export default function Stat({ data, children }) {
  const isGrowing = data.growthPercentage >= 0;
  return (
    <div className="card group bg-white hover:bg-[#00A5FF] hover:text-white p-6 rounded-md shadow-md">
      <div className="card-body p-0">
        <h2 className="card-title mb-4 font-normal text-lg">
          <span className="p-3 rounded-full bg-[#E5F6FF] text-[#00A5FF] group-hover:bg-[#19ADFF] group-hover:text-[#FFFFFF] flex items-center justify-center">
            {children}
          </span>
          {data.title}
        </h2>
        <p className="text-4xl font-semibold">
          {data.isMoney && "$"}
          {data.value}
        </p>
        {/* <p className="">
          {isGrowing ? (
            <UpRightIcon className="w-6 h-6 inline me-1" />
          ) : (
            <DownRightIcon className="w-6 h-6 inline me-1" />
          )}
          <span className="font-bold me-2">
            {Math.abs(data.growthPercentage)}%
          </span>
          <span className="text-gray-400 group-hover:text-gray-200" dir="ltr">
            +{data.isMoney && "$"}
            {data.todayStats} today
          </span>
        </p> */}
      </div>
    </div>
  );
}
