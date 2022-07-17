import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  styled,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import API from "../axios";
import AuthContext from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

const EditProfile = () => {
  const { user, editProfile } = React.useContext(AuthContext);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [avatarPreview, setAvatarPreview] = React.useState(null);
  const [error, setError] = React.useState({});
  // const [fetching, setFetching] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setGender(user.gender);
      setDateOfBirth(user.date_of_birth);
      setPhoneNumber(user.phone_no);
      setAvatar(user.avatar);
    }
  }, [user]);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
    setAvatarPreview(URL.createObjectURL(event.target.files[0]));
    // console.log(
    //   "🚀 ~ file: EditProfile.jsx ~ line 120 ~ EditProfile ~ previewFile",
    //   avatarPreview
    // );
    // console.log(
    //   "🚀 ~ file: EditProfile.jsx ~ line 120 ~ EditProfile ~ avatarFile",
    //   avatar
    // );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("date_of_birth", moment(dateOfBirth).format("YYYY-MM-DD"));
    formData.append("gender", gender);
    formData.append("phone_no", `${phoneNumber}`);
    if (avatarPreview) formData.append("avatar", avatar);
    editProfile(formData, setError);
    navigate("../profile/");
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 4, md: 8 },
          pb: { xs: 4, md: 8 },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <label
                htmlFor="icon-button-file"
                style={{
                  cursor: "pointer",
                  width: "min-content",
                }}
              >
                <Input
                  // error={error.avatar}
                  accept="image/*"
                  id="icon-button-file"
                  onChange={handleAvatarChange}
                  type="file"
                />
                {!avatarPreview ? (
                  <Avatar src={user?.avatar} sx={{ width: 200, height: 200 }} />
                ) : (
                  <Avatar
                    src={avatarPreview}
                    sx={{ width: 200, height: 200 }}
                  />
                )}
              </label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error.first_name}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoFocus
                helperText={error.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error.last_name}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="family-name"
                helperText={error.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                // disabled
                label="Email Address"
                name="email"
                value={email}
                inputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                autoComplete="email"
                helperText={error.email}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="space-between">
              <TextField
                error={error.gender}
                value={gender}
                required
                sx={{ width: "49%" }}
                select
                id="gender"
                onChange={(event) => setGender(event.target.value)}
                label="Gender"
                helperText={error.gender}
              >
                <MenuItem value={null} />
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
                <MenuItem value={"O"}>Other</MenuItem>
              </TextField>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  // error={error.date_of_birth}
                  label="Date of Birth"
                  inputFormat="DD/MM/YYYY"
                  value={dateOfBirth}
                  onChange={(date) => {
                    console.log(date);
                    setDateOfBirth(date);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={error.date_of_birth}
                      helperText={error.date_of_birth}
                      required
                      sx={{ width: "49%" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.phone_no}
                required
                fullWidth
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                name="mobile-number"
                label="Mobile Number"
                id="mobile-number"
                helperText={error.phone_no}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default EditProfile;
