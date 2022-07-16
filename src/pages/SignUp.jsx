import React from "react";
import {
  Avatar,
  Button,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const SignUp = () => {
  const { user, signUp } = React.useContext(AuthContext);
  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm_password, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp(
      { first_name, last_name, email, password, confirm_password },
      setError
    );
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          pt: { xs: "2rem", md: "4rem" },
          pb: { xs: "2rem", md: "4rem" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error?.first_name}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={first_name}
                onChange={(event) => setFirstName(event.target.value)}
                helperText={error?.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error?.last_name}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={last_name}
                onChange={(event) => setLastName(event.target.value)}
                helperText={error?.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error?.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                helperText={error?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error?.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                helperText={error?.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={password !== confirm_password}
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="new-password"
                value={confirm_password}
                onChange={(event) => setConfirmPassword(event.target.value)}
                helperText={
                  password !== confirm_password
                    ? "Passwords do not match."
                    : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to get announcements, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
