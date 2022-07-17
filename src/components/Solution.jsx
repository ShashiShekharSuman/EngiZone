import React from "react";
import {
  Avatar,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Collapse,
  TextField,
  Divider,
  InputAdornment,
  Dialog,
  DialogContent,
  Button,
  useMediaQuery,
  AppBar,
  Toolbar,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Skeleton,
  Slide,
} from "@mui/material";

import AuthContext from "../contexts/AuthContext";
import MessageContext from "../contexts/MessageContext";
import { Comment } from "../components";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import { styled, useTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import moment from "moment";
import parse from "html-react-parser";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForever from "@mui/icons-material/DeleteForever";
import TextEditor from "./TextEditor";
import API from "../axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CommentSection = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    padding: "6px",
    "& fieldset": {
      borderRadius: "10rem",
    },
  },
});

const Solution = ({ sol, handleDelete, loading }) => {
  const { user } = React.useContext(AuthContext);
  const [solution, setSolution] = React.useState(sol);
  const [vote, setVote] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [commentText, setCommentText] = React.useState("");
  const [fetching, setFetching] = React.useState(true);
  const [viewComments, setViewComments] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [solutionText, setSolutionText] = React.useState(
    solution ? solution : null
  );
  const { setMessage, setSnackBarVisibility, setSeverity } =
    React.useContext(MessageContext);

  React.useEffect(() => {
    if (solution && user) {
      API.get(`votes/${solution.id}/`).then((response) => {
        setVote(response.data.vote);
      });
      // .catch((error) => {
      //   // console.log(error)
      // });
    }
  }, [user]);

  const [openEditSolutionDialog, setOpenEditSolutionDialog] =
    React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateSolution = () => {
    API.patch(`solutions/${solution?.id}/`, { solution: solutionText }).then(
      (response) => {
        // console.log(
        //   "🚀 ~ file: Solution.jsx ~ line 161 ~ updateSolutionById ~ response",
        //   response
        // );
        setSolution(response.data);
        handleCloseEditSolutionDialog();
        setMessage("Solution updated successfully");
        setSeverity("success");
        setSnackBarVisibility(true);
      }
    );
    // .catch((error) => {
    //   console.log(
    //     "🚀 ~ file: Solution.jsx ~ line 164 ~ updateSolutionById ~ error",
    //     error
    //   );
    // });
  };

  const handleVote = (vote) => {
    API.post("votes/", { solution: solution.id, vote: vote }).then(
      (response) => {
        console.log(
          "🚀 ~ file: Solution.jsx ~ line 107 ~ voteSolution ~ response",
          response
        );
        setVote(response.data.vote);
        API.get(`solutions/${solution.id}`)
          .then((response) => setSolution(response.data))
          .catch((error) => console.log(error));
        setMessage("Thanks for your vote.");
        setSeverity("success");
        setSnackBarVisibility(true);
      }
    );
    // .catch((error) => {
    //   console.log(
    //     "🚀 ~ file: Solution.jsx ~ line 110 ~ voteSolution ~ error",
    //     error
    //   );
    // });
  };

  const handleViewComments = () => {
    console.log(viewComments);
    setViewComments((prev) => !prev);
    setFetching(true);
    if (!viewComments) {
      API.get(`comments/?solution=${solution.id}`).then((res) => {
        setComments(res.data);
        console.log(comments);
      });
      // .catch((error) => {
      //   console.log(error);
      // });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    API.post("comments/", { solution: solution.id, comment: commentText }).then(
      (response) => {
        // console.log(
        //   "🚀 ~ file: Solution.jsx ~ line 89 ~ addComment ~ response",
        //   response
        // );
        setComments((prev) => [response.data].concat(prev));
        setCommentText("");
        setMessage("Thanks for your comment.");
        setSeverity("success");
        setSnackBarVisibility(true);
        setFetching(false);
      }
    );
    // .catch((error) => {
    //   console.log(
    //     "🚀 ~ file: Solution.jsx ~ line 97 ~ handleSubmit ~ error",
    //     error
    //   );
    // });
  };

  const handleDeleteComment = (id) => {
    // console.log(
    //   "🚀 ~ file: Solution.jsx ~ line 188 ~ Solution ~ id",
    //   solution.id
    // );
    // console.log(
    //   "🚀 ~ file: Solution.jsx ~ line 204 ~ handleDeleteComment ~ solution._id",
    //   solution.id
    // );
    API.delete(`comments/${id}`).then((response) => {
      // console.log(
      //   "🚀 ~ file: Solution.jsx ~ line 191 ~ deleteCommentById ~ response",
      //   response
      // );
      setComments((prev) => prev.filter((comment) => comment.id !== id));
      setMessage("Comment deleted successfully.");
      setSeverity("success");
      setSnackBarVisibility(true);
    });
    // .catch((error) => {
    //   console.log(
    //     "🚀 ~ file: Solution.jsx ~ line 194 ~ deleteCommentById ~ error",
    //     error
    //   );
    // });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpenEditSolutionDialog = () => {
    setOpenEditSolutionDialog(true);
    setSolutionText(solution.solution);
  };

  const handleCloseEditSolutionDialog = () => {
    setOpenEditSolutionDialog(false);
  };

  const handleBodyChange = (event, editor) => {
    setSolutionText(editor.getData());
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
                  src={solution?.owner.avatar}
                  alt={solution?.owner.first_name.toUpperCase()}
                  sx={{ bgcolor: red[500] }}
                  aria-label=""
                />
              )
            }
            action={
              loading ? null : (
                <>
                  {user?.id === solution.owner.id && (
                    <IconButton onClick={handleClickOpenEditSolutionDialog}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {user?.id === solution.owner.id && (
                    <IconButton onClick={handleClickOpen}>
                      <DeleteForever />
                    </IconButton>
                  )}
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
                  sx={{ mb: 0.5 }}
                />
              ) : (
                `${solution.owner.first_name} ${solution.owner.last_name}`
              )
            }
            subheader={
              loading ? (
                <Skeleton animation="wave" height={12} width="20%" />
              ) : (
                `${moment(solution.updated_at).fromNow()} ${
                  solution.created_at === solution.updated_at ? "" : "edited"
                }`
              )
            }
          />
          <Divider />

          <CardContent sx={{ pt: 1, pb: 1 }}>
            {loading ? (
              <Typography variant="body1" color="text.primary">
                <Skeleton
                  animation="wave"
                  height={100}
                  sx={{ mb: 0.5, borderRadius: 1 }}
                  variant="rectangular"
                />
                {Array(4)
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
              </Typography>
            ) : (
              <div className="ck-content" style={{ wordBreak: "break-all" }}>
                {parse(solution.solution)}
              </div>
            )}
          </CardContent>
          <CardActions disableSpacing>
            <Grid container justifyContent="space-between" pl={1} pr={1}>
              <Grid item>
                {loading ? (
                  <Skeleton animation="wave" width={70} vairant="rectangular" />
                ) : (
                  <React.Fragment>
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleVote(vote === true ? null : true);
                      }}
                      aria-label="upVote"
                    >
                      {vote === true ? (
                        <ThumbUpIcon color="primary" />
                      ) : (
                        <ThumbUpOutlinedIcon />
                      )}
                    </IconButton>
                    {solution.up_votes}

                    <IconButton
                      size="small"
                      onClick={() => {
                        handleVote(vote === false ? null : false);
                      }}
                      aria-label="downVote"
                      sx={{ ml: 1 }}
                    >
                      {vote === false ? (
                        <ThumbDownIcon color="secondary" />
                      ) : (
                        <ThumbDownAltOutlinedIcon />
                      )}
                    </IconButton>
                    {solution.down_votes}
                  </React.Fragment>
                )}
              </Grid>
              <Grid item>
                {loading ? (
                  <Skeleton
                    animation="wave"
                    width={100}
                    vairant="rectangular"
                  />
                ) : (
                  <React.Fragment>
                    {2} Comments
                    <CommentSection
                      expand={viewComments}
                      onClick={handleViewComments}
                      aria-expanded={viewComments}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </CommentSection>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
          </CardActions>
          <Collapse in={viewComments} timeout="auto" unmountOnExit>
            <Divider />
            <Typography variant="h6" fontWeight="bold" p={2} pb={0}>
              Comments
            </Typography>
            <Grid container direction="column" pl={1} pr={2} pt={0} spacing={1}>
              <Grid item>
                <CardActions sx={{ pr: 0 }}>
                  <Avatar sx={{ bgcolor: red[500] }} />
                  <RoundedTextField
                    size="small"
                    variant="outlined"
                    placeholder="Your Thoughts"
                    fullWidth
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setCommentText("");
                            }}
                            size="small"
                            disabled={!commentText}
                            sx={{ mr: "1px" }}
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            onClick={handleSubmit}
                            color="primary"
                            size="medium"
                            type="submit"
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardActions>
              </Grid>
              {fetching ? (
                <Comment parent loading />
              ) : (
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    handleDelete={handleDeleteComment}
                  />
                ))
              )}
            </Grid>
          </Collapse>
        </Card>
      </Grid>
      <Dialog
        maxWidth="md"
        fullScreen={fullScreen}
        open={openEditSolutionDialog}
        scroll="body"
        onClose={handleCloseEditSolutionDialog}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseEditSolutionDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Your Solution
            </Typography>
            <Button
              autoFocus
              color="inherit"
              variant="text"
              onClick={handleUpdateSolution}
              endIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ p: "16px", pb: 0 }}>
          <TextEditor data={solutionText} handleChange={handleBodyChange} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Your Solution?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this solution? This action is
            irreversible!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDelete(solution?.id);
              handleClose();
            }}
            autoFocus
            variant="contained"
          >
            Delete
          </Button>
          <Button onClick={handleClose} variant="oulined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Solution;
