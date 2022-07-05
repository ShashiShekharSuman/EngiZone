import React from "react";
import {
  Avatar,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  IconButton,
  Chip,
  Skeleton,
  Divider,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";

const QuestionPreview = ({ question, loading }) => {
  const [bookmark, setBookmark] = React.useState(true);
  const [favorite, setFavorite] = React.useState(true);

  return (
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
                src={question.owner.avatar}
                alt={question.owner.first_name.toUpperCase()}
                sx={{ bgcolor: red[500] }}
                aria-label=""
              />
            )
          }
          action={
            loading ? null : (
              <>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => setFavorite((prev) => !prev)}
                >
                  <FavoriteIcon sx={!favorite ? { color: red[500] } : {}} />
                </IconButton>
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
              `${question.owner.first_name} ${question.owner.last_name}`
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="20%" />
            ) : (
              `${
                question.created_at === question.updated_at ? "" : "edited"
              } ${moment(question.updated_at).fromNow()}`
            )
          }
        />
        <Divider />

        <CardActionArea
          component={Link}
          to={`/questions/${question?.id}`}
          disabled={loading}
        >
          <CardContent sx={{ pt: 1, pb: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {loading ? <Skeleton animation="wave" /> : question.title}
            </Typography>
            {loading ? (
              <Typography variant="body2" color="text.primary">
                <React.Fragment>
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
                {parse(question.body)}
              </div>
            )}
          </CardContent>
        </CardActionArea>
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
                question.tags.map((tag) => (
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
  );
};

export default QuestionPreview;
