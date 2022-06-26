import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userJWT")) {
    req.headers.Authorization = `JWT ${localStorage.getItem("userJWT")}`;
  }
  return req;
});

export const signIn = (data) => API.post("/login/", data);
export const signUp = (data) => API.post("/users/", data);

// export const getUser = (id) => API.get("/users/" + { id } + "/");
export const getUser = () => API.get("/getuser/");
