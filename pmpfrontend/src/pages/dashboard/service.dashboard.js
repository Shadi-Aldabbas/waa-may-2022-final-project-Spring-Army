import axios from "axios";
import axiosInstance from "../../utils/interceptor";
// import moment from 'moment';
const baseUrl = "http://localhost:8080/api/v1/";

export const totalIncomePerLocation = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}properties/totalincome`);
  console.log("data", data);
  return data;
};
export const totalRentedPropertiesPerDayForWeek = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}rent/weekhistory`);
  console.log("data", data);
  return data;
};