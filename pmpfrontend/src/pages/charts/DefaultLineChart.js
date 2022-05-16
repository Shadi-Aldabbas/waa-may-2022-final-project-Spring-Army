import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DefaultLineChart = ({  dataKey,
  series,
  data,
  radius,
  hasExtendedTooltip,
  ...rest
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} {...rest}>
        <CartesianGrid vertical={false} />
        <Tooltip />
        <XAxis axisLine={false} dataKey="name" />
        <YAxis axisLine={false} />
        {series.map((item) => (
          <Line
            key={item.key}
            stroke={item.color}
            strokeWidth={2}
            dataKey={item.key}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DefaultLineChart;
