import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Skeleton, Typography } from "@mui/material";
import { AddSolution, Question, Solution } from "../components";
import API from "../axios";
import MessageContext from "../contexts/MessageContext";
import { useParams } from "react-router-dom";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [solutions, setSolutions] = useState(null);
  const [loading, setLoading] = useState({ question: true, solutions: true });
  const [body, setBody] = React.useState("");
  // const [bookmark, setBookmark] = React.useState(false);
  const [showAddAnswer, setShowAddAnswer] = React.useState(false);
  const { setMessage, setSnackBarVisibility, setSeverity } =
    React.useContext(MessageContext);

  useEffect(() => {
    setLoading({ question: true, solutions: true });

    API.get(`problems/${id}/`)
      .then((res) => {
        setQuestion(res.data);
        setLoading((load) => ({ ...load, question: false }));
      })
      .catch((error) => {
        console.log(error);
        // setLoading((load) => ({ ...load, question: false }));
      });

    API.get(`solutions/?question=${id}`)
      .then((res) => {
        setSolutions(res.data);
        setLoading((load) => ({ ...load, solutions: false }));
      })
      .catch((error) => {
        console.log(error);
        // setLoading((load) => ({ ...load, solutions: false }));
      });
  }, [id]);

  const handleBodyChange = (event, editor) => {
    setBody(editor.getData());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    API.post("solutions/", { question: question?.id, solution: body })
      .then((response) => {
        console.log(
          "🚀 ~ file: AskQuestion.jsx ~ line 29 ~ .then ~ response",
          response
        );
        setSolutions((prev) => prev.concat(response.data));
        setMessage("Thanks for your submission.");
        setSeverity("success");
        setSnackBarVisibility(true);
        setShowAddAnswer(false);
      })
      .catch((error) => {
        // console.log(
        //   "🚀 ~ file: AskQuestion.jsx ~ line 32 ~ handleSubmit ~ error",
        //   error
        // );
        setMessage(error.message);
        setSeverity("error");
        setSnackBarVisibility(true);
      });
  };

  const handleDeleteSolution = (id) => {
    API.delete(`solutions/${id}`)
      .then((response) => {
        console.log(
          "🚀 ~ file: QuestionDetail.jsx ~ line 26 ~ deleteSolutionById ~ response",
          response
        );
        setSolutions((prev) => prev.filter((solution) => solution.id !== id));
        setMessage("Solution deleted successfull.");
        setSeverity("success");
        setSnackBarVisibility(true);
      })
      .catch((error) => {
        setMessage(error.response.data.detail);
        setSeverity("error");
        setSnackBarVisibility(true);
      });
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid
          container
          spacing={3}
          direction={"column"}
          sx={{
            pt: { xs: "2rem", md: "4rem" },
            pb: { xs: "2rem", md: "4rem" },
          }}
        >
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h4" xs={6}>
                Question
              </Typography>
            </Grid>
            {loading.question ? (
              <Question loading />
            ) : (
              <Question
                key={question.id}
                question={question}
                // loading
              />
            )}
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h4" xs={6}>
                Solutions ({solutions ? solutions.length : "No"} Answers)
              </Typography>
            </Grid>
            {loading.solutions ? (
              <React.Fragment>
                <Solution loading />
                <Solution loading />
              </React.Fragment>
            ) : solutions.length ? (
              solutions.map((sol) => (
                <Solution
                  key={sol.id}
                  sol={sol}
                  handleDelete={handleDeleteSolution}
                  // loading
                />
              ))
            ) : (
              "Be the first one to solve"
            )}
          </Grid>
        </Grid>
      </Container>
      {loading.solutions ? null : showAddAnswer ? (
        <AddSolution
          body={body}
          handleChange={handleBodyChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Container
          maxWidth="md"
          sx={{
            pt: "1rem",
            pb: { xs: "2rem", md: "4rem" },
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => setShowAddAnswer(true)}
          >
            Add Your Solution
          </Button>
        </Container>
      )}
    </>
  );
};

export default QuestionDetail;
