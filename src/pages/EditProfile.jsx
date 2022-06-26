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
import {
  DatePicker,
  DesktopDatePicker,
  MobileDatePicker,
} from "@mui/x-date-pickers";
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
  const { user, setUser } = React.useContext(AuthContext);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [avatarPreview, setAvatarPreview] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);

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
    console.log(
      "🚀 ~ file: EditProfile.jsx ~ line 120 ~ EditProfile ~ previewFile",
      avatarPreview
    );
    console.log(
      "🚀 ~ file: EditProfile.jsx ~ line 120 ~ EditProfile ~ avatarFile",
      avatar
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFetching(true);
    let formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("date_of_birth", moment(dateOfBirth).format("YYYY-MM-DD"));
    formData.append("gender", gender);
    formData.append("phone_no", `${phoneNumber}`);
    if (avatarPreview) formData.append("avatar", avatar);
    API.patch(`users/${user.id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log(
          "🚀 ~ file: EditProfile.jsx ~ line 28 ~ updateUserDetails ~ re̥sponse",
          response
        );
        navigate("/profile");
        setUser(response.data);
        console.log(user);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: EditProfile.jsx ~ line 31 ~ updateUserDetails ~ error",
          error
        );
      });
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
                  accept="image/*"
                  id="icon-button-file"
                  onChange={handleAvatarChange}
                  type="file"
                />
                {!avatarPreview ? (
                  <Avatar
                    src={`http://engizone-api.herokuapp.com${user.avatar}`}
                    sx={{ width: 200, height: 200 }}
                  />
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
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="family-name"
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
              />
            </Grid>
            <Grid item xs={12} container justifyContent="space-between">
              <TextField
                value={gender}
                required
                sx={{ width: "49%" }}
                select
                id="gender"
                onChange={(event) => setGender(event.target.value)}
                label="Gender"
              >
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
                <MenuItem value={"O"}>Other</MenuItem>
              </TextField>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Date of Birth"
                  inputFormat="DD/MM/YYYY"
                  value={dateOfBirth}
                  onChange={(date) => {
                    console.log(date);
                    setDateOfBirth(date);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} required sx={{ width: "49%" }} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                name="mobile-number"
                label="Mobile Number"
                id="mobile-number"
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