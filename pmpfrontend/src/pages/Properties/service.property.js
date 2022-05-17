import axios from 'axios';
import axiosInstance from "../../utils/interceptor";
// import moment from 'moment';

export const getAllProperties = async () => {
  const { data } = await axiosInstance.get(
    `http://localhost:8080/api/v1/properties/top10`
  );
  console.log("data", data);
  return data;
};

// export const getQuestionMap = async (types) => {
//   const mapQuestion = await axios
//     .get('lookup/advertiser/profiling/survey/question?questionType=map')
//     .then((res) => res.data);

//   return mapQuestion;
// };

// export const getLatestCampaign = async () =>
//   axios
//     .get(
//       `reports/campaign/?startDate=${moment()
//         .subtract(900, 'days')
//         .format('YYYY-MM-DD')}&endDate=${moment(new Date()).format(
//           'YYYY-MM-DD',
//         )}&limit=1&sortBy=startDate`,
//     )
//     .then((res) => res.data);

// export const getCampaignsByDevice = async () =>
//   axios
//     .get(
//       `reports/performance/device/?startDate=${moment()
//         .subtract(900, 'days')
//         .format('YYYY-MM-DD')}&endDate=${moment(new Date()).format(
//           'YYYY-MM-DD',
//         )}&full=min`,
//     )
//     .then((res) => res.data);

// export const getCampaignsByGeo = async (groupBy) =>
//   axios
//     .get(
//       `reports/performance/geo/?startDate=${moment()
//         .subtract(900, 'days')
//         .format('YYYY-MM-DD')}&endDate=${moment(new Date()).format(
//           'YYYY-MM-DD',
//         )}&groupBy=${groupBy}&full=min`,
//     )
//     .then((res) => res.data);

// export const getTopSites = async () =>
//   axios
//     .get(
//       `reports/performance/site?startDate=${moment()
//         .subtract(900, 'days')
//         .format('YYYY-MM-DD')}&endDate=${moment(new Date()).format(
//           'YYYY-MM-DD',
//         )}&full=min`,
//     )
//     .then((res) => res.data);

export const getAdvertiserProfile = async () =>
  axios.get('advertiser/profile/').then((res) => res.data);
