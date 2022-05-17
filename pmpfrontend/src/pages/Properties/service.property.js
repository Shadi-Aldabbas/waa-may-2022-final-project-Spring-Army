import axios from "axios";
import axiosInstance from "../../utils/interceptor";
// import moment from 'moment';
const baseUrl = "http://localhost:8080/api/v1/properties";

export const getTop10Properties = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}/top10`);
  console.log("data", data);
  return data;
};


export const getAllProperties = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}`);
  console.log("data", data);
  return data;
};

export const deleteProperty = async (id) => {
  const { data }  = await axiosInstance.delete(`${baseUrl}/${id}`);
  console.log("data", data);
  return data;
};


export const addProperty = async (info, address) =>
  axios
    .post(`${baseUrl}`, {
      ...info,
      "address":{...address},
    })
    .then(({ data }) => data);
