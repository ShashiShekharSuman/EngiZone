import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Link,
  Grid,
  Fab,
  Container,
  CssBaseline,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SendIcon from "@mui/icons-material/Send";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" align="center" color="text.secondary">
      {"Copyright © "}
      <Link component={RouterLink} color="inherit" to="/">
        EngiZone
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <CssBaseline />
      <Grid
        container
        direction={"row"}
        spacing={{ xs: 2 }}
        justifyContent={"center"}
        // alignItems={"center"}
        // sx={{ p: { xs: "1rem" }, mt: "auto" }}
      >
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Typography
                variant="h5"
                color="secondary"
                fontWeight="500"
                align="center"
                gutterBottom
              >
                EngiZone
              </Typography>
              <Container maxWidth="sm">
                <Typography variant="body1">
                  Find best answer for your questions
                </Typography>
                <Copyright />
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
