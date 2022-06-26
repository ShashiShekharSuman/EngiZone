import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  IconButton,
  Typography,
  Skeleton,
  Link,
  TextField,
  InputAdornment,
  styled,
} from "@mui/material";
import { common, red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import API from "../axios";
import AuthContext from "../contexts/AuthContext";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForever from "@mui/icons-material/DeleteForever";

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    padding: "2px 4px",
    "& fieldset": {
      borderRadius: "10rem",
    },
  },
});

const Comment = ({ parent, comment, loading, handleDelete }) => {
  const [replies, setReplies] = React.useState(comment?.replies);
  const [replyText, setReplyText] = React.useState("");
  const [showReplyTextField, setShowReplyTextField] = React.useState(false);
  const { user } = React.useContext(AuthContext);

  const handleSubmit = async () => {
    API.post("comments/", {
      solution: comment.solution,
      parent: comment.id,
      comment: replyText,
    })
      .then((response) => {
        console.log(
          "🚀 ~ file: Comment.jsx ~ line 63 ~ addReply ~ response",
          response
        );
        setReplies((prev) => prev.concat(response.data));
        setReplyText("");
        setShowReplyTextField(false);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: Comment.jsx ~ line 66 ~ addReply ~ error",
          error
        );
      });
  };

  const handleDeleteReply = (id) => {
    API.delete(`comments/${id}`)
      .then((response) => {
        console.log(
          "🚀 ~ file: Comment.jsx ~ line 92 ~ deleteReplyById ~ response",
          response
        );
        setReplies((prev) => prev.filter((reply) => reply.id !== id));
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: Comment.jsx ~ line 95 ~ deleteReplyById ~ error",
          error
        );
      });
  };

  return (
    <Grid item container>
      <Grid item width="56px">
        <CardActions>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar
              src={comment.owner.avatar}
              alt={comment.owner.first_name.toUpperCase()}
              sx={{ bgcolor: red[500] }}
              aria-label=""
            />
          )}
        </CardActions>
      </Grid>
      <Grid item xs container spacing={1}>
        <Grid item width="100%">
          <Card variant="outlined">
            <CardContent
              sx={{
                padding: 0,
                pl: 1,
                "&:last-child": {
                  paddingBottom: 1,
                  // paddingTop: 0,
                },
              }}
            >
              <Grid container direction="column">
                <Grid item container justifyContent="space-between">
                  <Grid
                    item
                    display="flex"
                    sx={{
                      alignItems: "flex-end",
                    }}
                  >
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        height={15}
                        width={120}
                        sx={{ mt: 0.5, mb: 0.5 }}
                      />
                    ) : (
                      <React.Fragment>
                        <Typography fontWeight="bold" mr={1}>
                          {`${comment.owner.first_name} ${comment.owner.last_name}`}
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight="bold"
                          componant="span"
                        >
                          {`${moment(comment.updated_at).fromNow()} ${
                            comment.created_at === comment.updated_at
                              ? ""
                              : "edited"
                          }`}
                        </Typography>
                      </React.Fragment>
                    )}
                  </Grid>
                  <Grid item>
                    {loading ? null : (
                      <>
                        {user.id === comment.owner.id && (
                          <IconButton
                            sx={{ padding: 0, mr: 1 }}
                            onClick={() => handleDelete(comment.id)}
                          >
                            <DeleteForever fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton sx={{ padding: 0 }}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                  </Grid>
                </Grid>
                <Grid item width="100%" pr={1}>
                  <Typography variant="body2" align="justify">
                    {loading ? (
                      <React.Fragment>
                        {Array(2)
                          .fill()
                          .map((item, index) => (
                            <Skeleton
                              key={index}
                              animation="wave"
                              height={10}
                              width="100%"
                              sx={{ mb: 0.3 }}
                              variant="text"
                            />
                          ))}
                      </React.Fragment>
                    ) : (
                      comment.comment
                    )}
                  </Typography>
                </Grid>
                {loading ? null : (
                  <Link
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowReplyTextField((prev) => !prev)}
                    variant="body2"
                    width={"fit-content"}
                  >
                    {comment.parent
                      ? null
                      : showReplyTextField
                      ? "Cancel"
                      : "Reply"}
                  </Link>
                )}
              </Grid>
            </CardContent>
          </Card>
          {showReplyTextField && (
            <Grid
              item
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              pt={1}
            >
              {
                <RoundedTextField
                  size="small"
                  variant="outlined"
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  placeholder="Your Reply"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setReplyText("")}
                          size="small"
                          disabled={!replyText}
                          sx={{ mr: "1px" }}
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={handleSubmit}
                          color="primary"
                          size="small"
                          type="submit"
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              }
            </Grid>
          )}
        </Grid>
        <Grid item container>
          {loading
            ? parent && <Comment loading />
            : replies?.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  handleDelete={handleDeleteReply}
                />
              ))}
          {/* {parent && <Comment />}
           {parent && <Comment loading />} */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Comment;
