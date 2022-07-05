import {
  Grid,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Chip,
  Button,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FilterSection = () => {
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = React.useState(["Lorem", "Ipsum"]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography variant="h5">
          Filters: {filters.join(", ")}
          {/* Filters: {filters.map((filter) => `${filter}, `)} */}
        </Typography>
      </Grid>
      <Grid item>
        {/* <Chip variant="outlined" label="Latest" color="primary" /> */}
        <Button variant="outlined">
          Latest {/* <Avatar> */}
          <ExpandMoreIcon sx={{ ml: 1 }} />
          {/* </Avatar> */}
        </Button>
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default FilterSection;
