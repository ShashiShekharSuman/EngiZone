import React, { createContext, useState } from "react";
import API from "../axios";

const MessageContext = createContext();
export default MessageContext;

export const MessageProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

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
