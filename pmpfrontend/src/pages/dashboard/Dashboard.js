import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import Widget from "../../components/Widget/Widget";
import DefaultDonutChart from "../charts/DefaultDonutChart";
import DefaultLineChart from "../charts/DefaultLineChart";
import MUIDataTable from "mui-datatables";
import { apiLink } from "../../utils/ApiOpereations";
import axiosInstance from "../../utils/interceptor";
import {
  totalIncomePerLocation,
  totalRentedPropertiesPerDayForWeek,
  getLast10PrpertiesRented,
} from "./service.dashboard";
import moment from "moment";

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

const LineChartDataDemo = [
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
  const [lineChartData, setLineChartData] = useState("");
  const [last10PropertiesRented, setLast10PropertiesRented] = useState("");

  useEffect(() => {
    const getData = async () => {
      const incomePerLocationData = await totalIncomePerLocation();
      const lineDate = await totalRentedPropertiesPerDayForWeek();
      const last10Properties = await getLast10PrpertiesRented();

      let data = [];

      incomePerLocationData?.data?.forEach((item, index) => {
        data.push({
          name: `${item.address.city}`,
          value: item.income,
          color: COLORS[index % 7],
        });
      });
      setDonutChartData(data);


      data = [];
      lineDate?.data?.forEach((item, index) => {
        data.push({
          uv: `${item.uv}`,
          name: moment(item.startDate).format("dddd"),
        });
      });
      setLineChartData(data);
      setLast10PropertiesRented(last10Properties.data);
    };
    getData();
  }, []);

  return (
    <Grid container justifyContent="space-between" alignItems="baseline">
      <Grid item xs={12}>
        <Widget title="Properties rented this week" upperTitle>
          <Grid container direction="column" justifyContent="center">
            <Grid item xs={12}>
              <div style={{ width: "100%", height: 300 }}>
                <DefaultLineChart
                  data={lineChartData ? lineChartData : LineChartDataDemo}
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
        <Widget title="Total Income By Address" upperTitle>
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
                data={donutChartData ? donutChartData : DonutChartData}
              />
            </Grid>
          </Grid>
        </Widget>
      </Grid>
      <Grid item xs={6}>
        <MUIDataTable
          title="Last 10 logged in Users"
          data={
            last10PropertiesRented
              ? last10PropertiesRented.map((item) => {
                  return [
                    item.ownedBy.firstName + " " + item.ownedBy.lastname,
                    item.numberOfBedrooms,
                    item.numberOfBedrooms,
                    item.rentAmount,
                    item.securityDepositAmount,
                  ];
                })
              : ["1","1","1","1","1"]
          }
          columns={[
            "Owner Name",
            "Bathrooms",
            "Bedrooms",
            "Rent Price",
            "Deposit Amount",
          ]}
          options={{
            rowsPerPageOptions: [],
            elevation: 0,
            rowsPerPage: 6,
            download: false,
          }}
        />
      </Grid>
    </Grid>
  );
}
