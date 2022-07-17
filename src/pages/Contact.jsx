import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Fab,
  Container,
  CssBaseline,
  Avatar,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import API from "../axios";
import MessageContext from "../contexts/MessageContext";

const Contact = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessageText] = React.useState("");
  let { setMessage, setSnackBarVisibility, setSeverity } =
    React.useContext(MessageContext);

  const handleSubmit = () => {
    API.post("contact/", { name: name, email: email, message: message }).then(
      (response) => {
        console.log(response);
        setName("");
        setEmail("");
        setMessageText("");
        setMessage("Thanks for contacting us :)");
        setSeverity("success");
        setSnackBarVisibility(true);
      }
    );
    // .catch((error) => {
    //   setMessage(
    //     error.response.data ? error.response.data.detail : error.message
    //   );
    //   setSeverity("error");
    //   setSnackBarVisibility(true);
    // });
  };

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        display: "flex",
        pt: { xs: "2rem", md: "4rem" },
        pb: { xs: "2rem", md: "4rem" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Grid container>
        <Grid item container justifyContent={"center"} direction="column">
          <Grid item display={"flex"} justifyContent="center">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <ContactSupportIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography component="h1" align="center" variant="h5" paragraph>
              Contact Us
            </Typography>
          </Grid>
        </Grid>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                id="name"
                label="Full Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="outlined-multiline-static"
                label="Your Message"
                value={message}
                onChange={(event) => {
                  setMessageText(event.target.value);
                }}
                multiline
                rows={8}
              />
            </Grid>
            <Grid
              item
              sx={{
                width: "inherit",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Fab
                type="submit"
                component={Button}
                color="primary"
                variant="extended"
              >
                <SendIcon sx={{ mr: 1 }} /> Send
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default Contact;
