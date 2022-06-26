import React, { useEffect, useState } from "react";
import {
  Typography,
  Pagination,
  Grid,
  Container,
  Box,
  Button,
} from "@mui/material";
import { QuestionPreview, SearchBar } from "../components";
import { useNavigate, Link } from "react-router-dom";
import API from "../axios";

const Questions = () => {
  const url = new URL(window.location);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [count, setCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState(() =>
    url.searchParams.get("search") ? url.searchParams.get("search") : null
  );
  const [page, setPage] = useState(() =>
    url.searchParams.get("page") ? parseInt(url.searchParams.get("page")) : 1
  );
  useEffect(() => {
    setLoading(true);
    API.get(`problems/${url.search}`)
      .then((res) => {
        setQuestions(res.data.questions);
        setCount(res.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  }, [page, searchQuery]);

  console.log(questions);

  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <Grid
        item
        container
        spacing={2}
        direction={"column"}
        sx={{
          pt: { xs: "2rem", lg: "4rem" },
          pb: { xs: "2rem", lg: "4rem" },
        }}
      >
        <Grid item>
          <SearchBar
            defaultSearchQuery={searchQuery}
            setDefaultSearchQuery={setSearchQuery}
          />
        </Grid>

        {loading ? (
          <React.Fragment>
            <QuestionPreview loading />
            <QuestionPreview loading />
          </React.Fragment>
        ) : questions.length ? (
          <>
            <Grid
              container
              item
              spacing={1}
              display={"flex"}
              justifyContent={{ xs: "center", sm: "space-between" }}
              alignItems={"center"}
            >
              <Grid item>
                <Typography variant="h4">
                  {`${searchQuery ? "Found " : ""}${
                    questions.length
                  } Question(s)!`}
                </Typography>
              </Grid>
              <Grid item display={"flex"} alignItems={"center"}>
                <Typography mr={1} variant="body2">
                  {"Didn't find your question?"}
                </Typography>
                <Button
                  variant="contained"
                  LinkComponent={Link}
                  to="/ask-question"
                >
                  Ask Your Question
                </Button>
              </Grid>
            </Grid>
            {questions.map((question) => (
              <QuestionPreview
                key={question.id}
                id={question.id}
                owner={question.owner}
                title={question.title}
                body={question.body}
                tags={question.tags}
                created_at={question.created_at}
                updated_at={question.updated_at}
                // loading
              />
            ))}
          </>
        ) : (
          <Box
            sx={{
              p: "2rem",
              display: "flex",
              flex: "auto",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color={"secondary"}>
              No Question(s) Found!
            </Typography>
            {searchQuery ? (
              <>
                <Typography color={"text.secondary"} paragraph>
                  Try Searching Something Else.
                </Typography>
                <Typography align="center" variant="button" paragraph>
                  OR
                </Typography>
              </>
            ) : null}
            <Button
              variant="contained"
              LinkComponent={Link}
              to="../ask-question/"
            >
              Ask Your Question
            </Button>
          </Box>
        )}

        {loading
          ? null
          : count > 1 && (
              <Grid item>
                <Pagination
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  count={count}
                  page={page}
                  onChange={(event, pageNum) => {
                    console.log(event);
                    window.scroll(0, 0);
                    setPage(pageNum);
                    url.searchParams.set("page", pageNum);
                    navigate(url);
                  }}
                  showFirstButton
                  showLastButton
                  size="small"
                  variant="outlined"
                  shape="circular"
                  color="primary"
                />
              </Grid>
            )}
      </Grid>
    </Container>
  );
};

export default Questions;
