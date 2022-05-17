import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import Widget from "../../components/Widget/Widget";
import DefaultDonutChart from "../charts/DefaultDonutChart";
import DefaultLineChart from "../charts/DefaultLineChart";
import MUIDataTable from "mui-datatables";
import { apiLink } from "../../utils/ApiOpereations";
import axiosInstance from "../../utils/interceptor";
import { totalIncomePerLocation } from "./service.dashboard";

const DonutChartData = [
  { name: "Desktop", value: 400, color: "#037971" },
  { name: "Tablet", value: 300, color: "#3c91e6" },
  { name: "Mobile", value: 300, color: "#e5e5e5" },
  { name: "CTV", value: 200, color: "#89b620" },
  { name: "1", value: 200, color: "#890" },
  { name: "C2TV", value: 200, color: "#620" },
  { name: "CT3V", value: 200, color: "#89b" },
];
const COLORS = [
  "#89b620",
  "#3c91e6",
  "#e5e5e5",
  "#037971",
  "#74C69D",
  "#5D4E6D",
  "#F7942F",
  "#EFABCD",
];

const LineChartData = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];
const series = [{ key: "uv", color: "#8884D8" }];

export default function Dashboard(props) {
  const [donutChartData, setDonutChartData] = useState("");

  useEffect(() => {
    const getData = async () => {
      const incomePerLocationData = await totalIncomePerLocation();
     
      const data = [];
      incomePerLocationData?.data?.forEach((item, index) => {
        data.push({
          name: `${item.address.zipCode}`,
          value: item.income,
          color: COLORS[index % 7],
        });
      });
      setDonutChartData(data);
    };
    getData();
    console.log("donutChartData", donutChartData);
  }, []);

  return (
    <Grid container justifyContent="space-between" alignItems="baseline">
      <Grid item xs={12}>
        <Widget title="Line Chart" upperTitle>
          <Grid container direction="column" justifyContent="center">
            <Grid item xs={12}>
              <div style={{ width: "100%", height: 300 }}>
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
                height={440}
                cx={"50%"}
                cy={"50%"}
                padding={0}
                outerRadius={"90%"}
                innerRadius={100}
                cornerRadius={0}
                data={donutChartData ? donutChartData: DonutChartData }
              />
            </Grid>
          </Grid>
        </Widget>
      </Grid>
      {/* <Grid item xs={6}>
          <MUIDataTable
            title="Employee List"
            data={test?.map(item => {
              return [
                  item.name,
                  item.numberOfBathrooms,
                  item.numberOfBedrooms,
              ]
          })}
            columns={["Name", "numberOfBathrooms", "numberOfBedrooms"]}
            options={{
              rowsPerPageOptions:[],
              elevation:0,
              rowsPerPage:6,
              download:false,
            }}
          />
    </Grid> */}
      {/* <Grid item xs={6}>
          <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={["Name", "Company", "City", "State"]}
            options={{
              rowsPerPageOptions:[],
              elevation:0,
              rowsPerPage:6,
              download:false,
            }}
          />
    </Grid> */}
    </Grid>
  );
}
