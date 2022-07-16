import { createContext, useEffect, useState, useContext } from "react";
import API from "../axios";
import MessageContext from "./MessageContext";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(false);
  let { setMessage, setSnackBarVisibility, setSeverity } =
    useContext(MessageContext);

  API.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      if (err.config.url !== "login/" && err.response) {
        // Access Token Expired
        console.log(err);
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
              // Refreash Token Expired
              signOut();
              setMessage(
                _error.response.status === 401
                  ? "Sesson Expired"
                  : _error.message
              );
              setSeverity(_error.response.status === 401 ? "info" : "error");
              setSnackBarVisibility(true);
              // return Promise.reject(_error);
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

  useEffect(() => {
    if (localStorage.getItem("access")) {
      setLoading(true);
      API.get("users/auth")
        .then((res) => {
          console.log(res);
          setUser(res.data);
          setMessage(
            "Welcome back " + res.data.first_name + " " + res.data.last_name
          );
          setSeverity("");
          setSnackBarVisibility(true);
          setLoading(false);
        })
        .catch((error) => {
          setMessage(
            error.message
          );
          setSeverity("error");
          setSnackBarVisibility(true);
        });
    }
  }, []);

  const signIn = (data) => {
    setLoading(true);
    API.post("login/", data)
      .then((res) => {
        localStorage.setItem("access", res.data.token.access);
        localStorage.setItem("refresh", res.data.token.refresh);
        setUser(res.data.user);
        setMessage(`Hi ${res.data.user.first_name} ${res.data.user.last_name}`);
        setSeverity("success");
        setSnackBarVisibility(true);
        setLoading(false);
      })
      .catch((error) => {
        setMessage(
          error.response.data ? error.response.data.detail : error.message
        );
        setSeverity("error");
        setSnackBarVisibility(true);
      });
  };

  const signUp = (data, setError) => {
    setLoading(true);
    API.post("users/", data)
      .then((res) => {
        console.log(res);
        // navigate("/");
        const email = data.email;
        const password = data.password;
        signIn({ email, password });
        setMessage("Your account has been successfully created.");
        setSeverity("success");
        setSnackBarVisibility(true);
        setLoading(false);
      })
      .catch((error) => {
        setMessage(error.message);
        setSeverity("error");
        setSnackBarVisibility(true);
        setError(error.response?.data);
      });
  };

  let signOut = () => {
    setLoading(true);
    // setAuthToken(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setMessage("Your have been logged out.");
    setSeverity("info");
    setSnackBarVisibility(true);
    setLoading(false);
  };

  const editProfile = (formData, setError) => {
    setLoading(true);
    API.patch(`users/${user.id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(
          "🚀 ~ file: EditProfile.jsx ~ line 28 ~ updateUserDetails ~ re̥sponse",
          response
        );
        setUser(response.data);
        console.log(user);
        setMessage("Your changes have been saved.");
        setSeverity("success");
        setSnackBarVisibility(true);
        setLoading(false);
      })
      .catch((error) => {
        setMessage(error.message);
        setSeverity("error");
        setSnackBarVisibility(true);
        setError(error.response.data);
      });
  };

  let contextData = {
    loading: loading,
    user: user,
    signIn: signIn,
    signOut: signOut,
    signUp: signUp,
    editProfile: editProfile,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {/* {loading ? null : children} */}
      {children}
    </AuthContext.Provider>
  );
};
