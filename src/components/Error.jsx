import React from "react";
import MessageContext from "../contexts/MessageContext";

const Error = ({ error }) => {
  const { setMessage, setSeverity, setSnackBarVisibility } =
    React.useContext(MessageContext);

  React.useEffect(() => {
    console.log(error);
    setMessage(error.message);
    setSeverity("error");
    setSnackBarVisibility(true);
  }, []);

  return <></>;
};

export default Error;
