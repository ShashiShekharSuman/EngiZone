import React from "react";
import {
  Avatar,
  Typography,
  Grid,
  Card,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  IconButton,
  Chip,
  Skeleton,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import parse from "html-react-parser";
import AuthContext from "../contexts/AuthContext";
import API from "../axios";

const Question = ({
  id,
  owner,
  title,
  body,
  tags,
  loading,
  created_at,
  updated_at,
}) => {
  const { user } = React.useContext(AuthContext);
  const [bookmark, setBookmark] = React.useState(true);
  const [favorite, setFavorite] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDeleteQuestion = () => {
    handleClose();
    API.delete(`problems/${id}`)
      .then((response) => {
        console.log(
          "🚀 ~ file: Question.jsx ~ line 37 ~ deleteQuestionById ~ response",
          response
        );
        navigate("/questions");
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: Question.jsx ~ line 40 ~ deleteQuestionById ~ error",
          error
        );
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookmark = (bookmark) => {
    console.log(bookmark);

    setBookmark((prev) => !prev);
  };

  return (
    <>
      <Grid item>
        <Card variant="outlined">
          <CardHeader
            sx={{ pb: 1 }}
            avatar={
              loading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                />
              ) : (
                <Avatar
                  src={owner.avatar}
                  alt={owner.first_name.toUpperCase()}
                  sx={{ bgcolor: red[500] }}
                  aria-label=""
                />
              )
            }
            action={
              loading ? null : (
                <>
                  {user?.id === owner.id && (
                    <IconButton
                      LinkComponent={Link}
                      to={`/questions/${id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {user?.id === owner.id && (
                    <IconButton
                      aria-label="delete"
                      onClick={handleClickOpen}
                      // onClick={handleDeleteQuestion}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="bookmark"
                    onClick={() => setBookmark((prev) => !prev)}
                  >
                    {!bookmark ? (
                      <BookmarkAddedIcon sx={{ color: "green" }} />
                    ) : (
                      <BookmarkIcon />
                    )}
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </>
              )
            }
            title={
              loading ? (
                <Skeleton
                  animation="wave"
                  height={15}
                  width="30%"
                  sx={{ mb: 1 }}
                />
              ) : (
                `${owner.first_name} ${owner.last_name}`
              )
            }
            subheader={
              loading ? (
                <Skeleton animation="wave" height={10} width="20%" />
              ) : (
                `${moment(updated_at).fromNow()} ${
                  created_at === updated_at ? "" : "edited"
                }`
              )
            }
            // subheaderTypographyProps={{ variant: "caption" }}
          />
          <Divider />
          <CardContent sx={{ pt: 1, pb: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {loading ? <Skeleton animation="wave" /> : title}
            </Typography>
            {loading ? (
              <Typography variant="body2" color="text.primary">
                <React.Fragment>
                  <Skeleton
                    animation="wave"
                    height={100}
                    sx={{ mb: 0.5, borderRadius: 1 }}
                    variant="rectangular"
                  />
                  {Array(3)
                    .fill()
                    .map((item, index) => (
                      <Skeleton
                        key={index}
                        animation="wave"
                        height={15}
                        sx={{ mb: 0.3 }}
                        variant="text"
                      />
                    ))}
                </React.Fragment>
              </Typography>
            ) : (
              <div className="ck-content" style={{ wordBreak: "break-all" }}>
                {parse(body)}
              </div>
            )}
          </CardContent>
          <CardActions sx={{ p: 2, pt: 1 }}>
            <Grid
              spacing={1}
              container
              alignItems={"center"}
              justifyContent={{ xs: "center", sm: "space-between" }}
            >
              <Grid item display="flex">
                {loading ? (
                  <React.Fragment>
                    {Array(3)
                      .fill()
                      .map((item, index) => (
                        <Skeleton
                          key={index}
                          animation="wave"
                          width={70}
                          height={30}
                          sx={{ mr: 1, borderRadius: 2 }}
                        />
                      ))}
                  </React.Fragment>
                ) : (
                  tags.map((tag) => (
                    <Chip
                      color="primary"
                      key={tag.id}
                      label={tag.tag_name}
                      onClick={() => {}}
                      sx={{ mr: 1 }}
                      variant="outlined"
                    />
                  ))
                )}
              </Grid>
              <Grid item display="flex">
                {/* <Grid item> */}
                {loading ? (
                  <React.Fragment>
                    {Array(3)
                      .fill()
                      .map((item, index) => (
                        <Skeleton
                          key={index}
                          animation="wave"
                          width={70}
                          height={30}
                          sx={{ mr: 1, borderRadius: 2 }}
                        />
                      ))}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Chip
                      label={`Answers: ${2}`}
                      variant="outlined"
                      color="success"
                      sx={{ ml: { sm: 0, md: 1 } }}
                    />
                    <Chip
                      label={`Views: ${4}`}
                      color="info"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                    <Chip
                      label={`Views: ${4}`}
                      color="info"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Your Question?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this question? This action is
            irreversible!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteQuestion} autoFocus variant="contained">
            Delete
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Question;
