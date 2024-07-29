import React from "react";

export default function LoadingDots() {
  return (
    <div className="h-screen w-full absolute top-0 left-0 bg-base-300">
      <div className="flex justify-center items-center h-full w-full ">
        <div className="flex items-center">
          <span className="loading loading-ring loading-xs "></span>
          <span className="loading loading-ring loading-sm "></span>
          <span className="loading loading-ring loading-md "></span>
          <span className="loading loading-ring loading-lg "></span>
        </div>
      </div>
    </div>
  );
}
