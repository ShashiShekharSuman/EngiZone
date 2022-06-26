import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000/";
const BASE_URL = "http://engizone-api.herokuapp.com/";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access")) {
    req.headers.Authorization = `JWT ${localStorage.getItem("access")}`;
  }
  return req;
});

// API.interceptors.request.use(
//   (config) => {
//     const token = TokenService.getLocalAccessToken();
//     if (token) {
//       // config.headers["Authorization"] = localStorage.getItem("access") ? `JWT ${localStorage.getItem("access")}` : null;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
API.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.config.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !err.config._retry) {
        err.config._retry = true;
        // try {
        const refresh = localStorage.getItem("refresh");
        await API.post("refresh/", { refresh })
          .then((res) => {
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
          })
          .catch((_error) => {
            console.log(_error);
            return Promise.reject(_error);
          });
        return API(err.config);
        // } catch (_error) {
        //   return Promise.reject(_error);
        // }
      }
    }
    return Promise.reject(err);
  }
);

export default API;
