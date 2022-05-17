import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    config => {
        const token = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJZTDJic0xMb0h5QkdraHp0amRaNkJsbkMzSDRfbHd3ZXl3WndlbkV1X3pFIn0.eyJleHAiOjE2NTI3OTQwMTIsImlhdCI6MTY1Mjc1ODAxMiwianRpIjoiMTQ1NWFlM2EtZmE0Ny00MjlmLWJkODEtNTgyNjRjYTI1NGM1IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDI0L2F1dGgvcmVhbG1zL3BtcCIsImF1ZCI6InJlYWxtLW1hbmFnZW1lbnQiLCJzdWIiOiJkNTg3YmNjYi0wZWRlLTQ2MTAtOTEyNy04YmM3MjFhMDJiZTQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJwbXBhcHAiLCJzZXNzaW9uX3N0YXRlIjoiZWRiNzA4NTctMjQ4My00NWU3LWEyNzAtMGMyM2QxMDA5NjI4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImFkbWluIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJtYW5hZ2UtcmVhbG0iLCJtYW5hZ2UtdXNlcnMiLCJtYW5hZ2UtY2xpZW50cyJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJlZGI3MDg1Ny0yNDgzLTQ1ZTctYTI3MC0wYzIzZDEwMDk2MjgiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJIYXNpbSBIYXNpbSIsInByZWZlcnJlZF91c2VybmFtZSI6InNwcmluZ2FybXloYXNAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6Ikhhc2ltIiwiZmFtaWx5X25hbWUiOiJIYXNpbSIsImVtYWlsIjoic3ByaW5nYXJteWhhc0BnbWFpbC5jb20ifQ.cRHBQo1y_e_nG4ldpHRre0-iqC1PU7AnXvZyklrbmrVhFjUdFT3Pwew1MLzFCpqV1Dm0_70SDKRUJe-wjOIWk4qzzTbjHbhPhpKWCoxVX4rjt4IrUVClwomC3XzPna5Cgag-MqIZDng4Ev6PiF8BnCUxLnb8NkIgp3tSI35cEvPfmPTDbbq2lOPPbl6PYUrG-2H1Maze15nWOZZsML0qu-AtASDBr9zqRAsBnXe7gX7PkZjfKlPwhcOzXYe4UeTIc5xkKihLJmE0jyeOaA4aBpobI5KMalCFMYRIXjC9PIAU-bjLRHn2HHBmRunweQQccadw8x9YQg8aXlPIG07Y2A
        `;
        config.headers['Authorization'] = 'Bearer ' + token;
        console.log("Auth", token);
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