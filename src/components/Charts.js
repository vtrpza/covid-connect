import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Charts = ({ data }) => {
  const formatYAxisTick = (tick) => {
    return tick.toLocaleString();
  };

  return (
    <LineChart width={900} height={500} data={data}>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <XAxis dataKey="label" />
      <YAxis width={100} tickFormatter={formatYAxisTick} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};

export default Charts;
