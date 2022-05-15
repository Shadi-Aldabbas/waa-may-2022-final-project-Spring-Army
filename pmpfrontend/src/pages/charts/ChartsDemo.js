import React, { useState } from "react";
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import Widget from "../../components/Widget/Widget";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import DefaultLineChart from "./DefaultLineChart";
import DefaultDonutChart from "./DefaultDonutChart";
const DonutChartData = [
  { name: "Desktop", value: 400, color: "#037971" },
  { name: "Tablet", value: 300, color: "#3c91e6" },
  { name: "Mobile", value: 300, color: "#e5e5e5" },
  { name: "CTV", value: 200, color: "#89b620" },
  { name: "1", value: 200, color: "#890" },
  { name: "C2TV", value: 200, color: "#620" },
  { name: "CT3V", value: 200, color: "#89b" },
];

const LineChartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const series = [{ key: "uv", color: "#8884D8" }];

export default function ChartsDemo() {
  return (
    <Grid container justifyContent="space-between" alignItems="baseline">
      <Grid item xs={6}>
        <Widget title="Donut Chart" upperTitle>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <DefaultDonutChart
                width={450}
                height={450}
                cx={"50%"}
                cy={"50%"}
                padding={0}
                outerRadius={"90%"}
                innerRadius={100}
                cornerRadius={0}
                data={DonutChartData}
              />
            </Grid>
          </Grid>
        </Widget>
      </Grid>
      <Grid item xs={12}>
        <Widget title="Line Chart" upperTitle>
          <Grid container direction="column" justifyContent="center">
            <Grid item xs={12}>
              <div style={{ width: "100%", height: 400 }}>
                <DefaultLineChart
                  data={LineChartData}
                  dataKey="name"
                  series={series}
                  margin={{
                    top: 50,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
    </Grid>
  );
}
