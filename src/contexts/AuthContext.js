import { createContext, useEffect, useState } from "react";
import API from "../axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("access")) {
      API.get("auth/")
        .then((res) => {
          console.log(res);
          setUser(res.data);
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
    setLoading(false);
  }, []);

  const signIn = (data) => {
    setLoading(true);
    API.post("login/", data)
      .then((res) => {
        localStorage.setItem("access", res.data.token.access);
        localStorage.setItem("refresh", res.data.token.refresh);
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const signUp = (data) => {
    setLoading(true);
    API.post("users/", data)
      .then((res) => {
        console.log(res.data);
        // navigate("/");
        const email = data.email;
        const password = data.password;
        signIn({ email, password });
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  let signOut = () => {
    setLoading(true);
    // setAuthToken(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setLoading(false);
  };

  let contextData = {
    loading: loading,
    user: user,
    signIn: signIn,
    signOut: signOut,
    signUp: signUp,
  };

  // useEffect(() => {
  //   if (loading) {
  //     updateToken();
  //   }

  //   let fourMinutes = 1000 * 60 * 4;

  //   let interval = setInterval(() => {
  //     if (authTokens) {
  //       updateToken();
  //     }
  //   }, fourMinutes);
  //   return () => clearInterval(interval);
  // }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {/* {loading ? null : children} */}
      {children}
    </AuthContext.Provider>
  );
};
