import React, { createContext, useState } from "react";
import API from "../axios";

const MessageContext = createContext();
export default MessageContext;

export const MessageProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  API.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (
        (error.config.url == "login/" || error.response.status !== 401) &&
        ((!error.config.url.startsWith("bookmarks/") &&
          !error.config.url.startsWith("votes/")) ||
          error.response.status !== 404)
      ) {
        // console.log(error);
        setMessage(
          error.response.data.detail
            ? // && error.config.method !== "post"
              error.response.data.detail
            : error.message
        );
        setSeverity("error");
        setIsVisible(true);
      }
      return Promise.reject(error);
    }
  );

  let contextData = {
    isSnackBarVisible: isVisible,
    message: message,
    severity: severity,
    setMessage: setMessage,
    setSeverity: setSeverity,
    setSnackBarVisibility: setIsVisible,
  };

  return (
    <MessageContext.Provider value={contextData}>
      {/* {loading ? null : children} */}
      {children}
    </MessageContext.Provider>
  );
};
