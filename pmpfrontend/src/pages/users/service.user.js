import axios from "axios";
import axiosInstance from "../../utils/interceptor";
// import moment from 'moment';
const baseUrl = "http://localhost:8080/api/v1/users";

export const getAllUsers = async () => {
    const { data } = await axiosInstance.get(`${baseUrl}`);
    console.log("data", data);
    return data;
  };