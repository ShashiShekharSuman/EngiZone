import {
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Avatar,
  Chip,
  Autocomplete,
  Card,
} from "@mui/material";
import React from "react";
import TextEditor from "../components/TextEditor";
import HelpIcon from "@mui/icons-material/Help";

import { useNavigate } from "react-router-dom";
import API from "../axios";

const AskQuestion = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    API.get("tags/")
      .then((response) => {
        setOptions(response.data);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: AskQuestion.jsx ~ line 52 ~ setOptions ~ error",
          error
        );
      });
  }, []);

  const handleBodyChange = (event, editor) => {
    setBody(editor.getData());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    API.post("problems/", { title: title, body: body, tags: tags })
      .then((response) => {
        console.log(
          "🚀 ~ file: AskQuestion.jsx ~ line 29 ~ .then ~ response",
          response
        );
        navigate(`/questions/${response.data.id}`);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: AskQuestion.jsx ~ line 32 ~ handleSubmit ~ error",
          error
        );
      });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        pt: { xs: "2rem", md: "4rem" },
        pb: { xs: "2rem", md: "4rem" },
      }}
    >
      <Grid
        component="form"
        container
        direction="column"
        position="relative"
        justifyContent="center"
        onSubmit={handleSubmit}
      >
        <Grid item container justifyContent={"center"} direction="column">
          <Grid item display={"flex"} justifyContent="center">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <HelpIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography component="h1" align="center" variant="h5" paragraph>
              Ask New Question
            </Typography>
          </Grid>
        </Grid>
        <Grid item pb={2}>
          <TextField
            variant="outlined"
            label="Title"
            helperText="Ask a genuine question and imagine you are asking a question to another person"
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            Describe Your Question
          </Typography>
        </Grid>
        <TextEditor data={body} handleChange={handleBodyChange} />
        <Grid item pt={2} pb={2}>
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.tag_name}
            limitTags={5}
            filterSelectedOptions
            loading
            onChange={(event, value) => {
              setTags(value);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  size="small"
                  color="primary"
                  label={option.tag_name}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
                helperText="Add up to 5 tag to describe what your question is about"
                fullWidth
                placeholder="Add Tags"
              />
            )}
            ListboxComponent={Grid}
            ListboxProps={{
              container: true,
              spacing: 1,
              justifyContent: "center",
              sx: { pr: 1, overflow: "auto" },
            }}
            renderOption={(props, option) => (
              <Grid item xs={10} sm={4} key={props.index}>
                <Card
                  {...props}
                  sx={{ width: "100%", height: "100%" }}
                  variant="outlined"
                >
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography variant="h6" color="primary">
                        {option.tag_name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">{option.tag_type}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" align="justify" gutterBottom>
                        {option.tag_description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" fullWidth>
            Post your question
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AskQuestion;
