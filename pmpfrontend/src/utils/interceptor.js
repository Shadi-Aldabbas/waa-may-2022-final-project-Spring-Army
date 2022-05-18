import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('auth-token');
        config.headers['Authorization'] = 'Bearer ' + token;
        // console.log("Auth", token);
        return config;
    }, error => {
        Promise.reject(error)
    }
);

axiosInstance.interceptors.response.use((response) => {
    return response
}, function(error) {
    return Promise.reject(error)   
});

export default axiosInstance;