import React from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const renderLegend = (props) => {
  const { payload } = props;

  return (
    <ul className="list-none p-0 flex justify-center gap-3 flex-wrap" dir="rtl">
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{ display: "flex", alignItems: "center", margin: "5px 0" }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: entry.color,
              marginLeft: 10, // Adjust the margin as needed
            }}
          ></div>
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};
export default function PieChartComponent({ className, data }) {
  return (
    <div className={className}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
          <Legend content={renderLegend} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
