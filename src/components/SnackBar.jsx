import React from "react";
import { Snackbar, Slide } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import MessageContext from "../contexts/MessageContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}

const SnackBar = () => {
  const { message, severity, isSnackBarVisible, setSnackBarVisibility } =
    React.useContext(MessageContext);

  const handleClose = (event, reason) => {
    if (severity && reason === "clickaway") {
      return;
    }
    setSnackBarVisibility(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={5000}
      open={isSnackBarVisible}
      TransitionComponent={TransitionRight}
      onClose={handleClose}
      message={message}
      // key=
    >
      {severity && (
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default SnackBar;
