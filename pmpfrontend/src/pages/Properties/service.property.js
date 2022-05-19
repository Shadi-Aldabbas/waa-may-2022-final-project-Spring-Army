import axios from "axios";
import axiosInstance from "../../utils/interceptor";
// import moment from 'moment';
const baseUrl = "http://localhost:8080/api/v1/";

export const getTop10Properties = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}properties/top10`);
  // console.log("data", data);
  return data;
};

export const getAllProperties = async () => {
  const { data } = await axiosInstance.get(`${baseUrl}properties`);
  // console.log("data", data);
  return data;
};
export const getPropertyById = async (id) => {
  const { data } = await axiosInstance.get(`${baseUrl}properties/${id}`);
   console.log("data", data);
  return data;
};

export const deleteProperty = async (id) => {
  const { data } = await axiosInstance.delete(`${baseUrl}properties/${id}`);
  // console.log("data", data);
  return data;
};

export const addFile = async (file) => {
  const url = `${baseUrl}file-uploads`;
  const config = {
    headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p' }
   };
  const { data } = await axiosInstance.post(url,file,config);
  // console.log("data", data);
  return data;
};

export const addProperty = async (info, address, user,uploadedFiles) =>
{
  console.log("url, files, config",info, address, user, uploadedFiles);
  const getToken = localStorage.getItem("auth-token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` }
};
 let result = await axios
    .post(`${baseUrl}properties`, {
      ...info,
      address: { ...address },
      ownedBy: { ...user },
      photos:uploadedFiles
    },config)
    .then(({ data }) => data);
return result;
  }



export const addFilesForProperty = async (files) => {
  const url = `${baseUrl}file-uploads`;
  const formData = new FormData();
  formData.append("file", files);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  // console.log("url, files, config", url, files, config);
  axios
    .post(url, files, config)
    .then(({ data }) => data);
};
