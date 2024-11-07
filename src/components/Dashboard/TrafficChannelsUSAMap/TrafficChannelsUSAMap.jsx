import React from "react";
import cn from "../../../lib/cn";

export default function TrafficChannelsUSAMap({ className }) {
  return (
    <div className={cn(className)}>
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg" dir="rtl">
          Traffic Channels
        </h3>
        <select className="select min-h-8 h-8">
          <option selected>USA</option>
        </select>
      </div>
    </div>
  );
}
