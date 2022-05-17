import axios from "axios";
import axiosInstance from "../../utils/interceptor";
// import moment from 'moment';
const baseUrl = "http://localhost:8080/api/v1/properties";

export const totalIncomePerLocation = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}/totalincome`);
  console.log("data", data);
  return data;
};