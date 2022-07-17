import React from "react";
import API from "../axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";

const ContactUs = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = () => {
    API.post("contact/")
      .then((response) => {
        console.log(response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box spacing={2} p={6}>
      <Card style={{ maxWidth: 500, margin: "0 auto", padding: "20px 5px" }}>
        <form>
          <CardContent>
            <Typography
              variant="h3"
              fontWeight={400}
              gutterBottom
              textAlign="center"
            >
              Contact Us
            </Typography>
            <Stack spacing={3}>
              <TextField
                label="Name"
                placeholder="Your name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                variant="outlined"
                required
              />
              <TextField
                type="email"
                label="Email"
                placeholder="Your Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                variant="outlined"
                required
              />
              <TextField
                type="message"
                multiline
                rows={5}
                label="Message"
                placeholder="Message"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                variant="outlined"
                required
              />
            </Stack>
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              type="submit"
            >
              Submit
            </Button>
          </CardContent>
        </form>
      </Card>
    </Box>
  );
};

export default ContactUs;
