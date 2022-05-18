import axiosInstance from "../../utils/interceptor";
const baseUrl = "http://localhost:8080/api/v1/";

export const totalIncomePerLocation = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}properties/totalincome`);
  console.log("totalincome", data);
  return data;
};
export const totalRentedPropertiesPerDayForWeek = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}rent/weekhistory`);
  console.log("weekhistory", data);
  return data;
};
export const getLast10PrpertiesRented = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}properties/top10`);
  console.log("top10", data);
  return data;
};