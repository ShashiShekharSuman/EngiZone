import {
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Avatar,
  Autocomplete,
  Chip,
  Card,
} from "@mui/material";
import React from "react";
import TextEditor from "../components/TextEditor";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate, useParams } from "react-router-dom";
import API from "../axios";
import MessageContext from "../contexts/MessageContext";

const EditQuestion = () => {
  const { id } = useParams();

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [changes, setChanges] = React.useState({});
  let { setMessage, setSnackBarVisibility, setSeverity } =
    React.useContext(MessageContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    API.get(`problems/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setBody(response.data.body);
        setTags(response.data.tags);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: EditQuestion.jsx ~ line 31 ~ getQuestionById ~ error",
          error
        );
      });
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
    setChanges((prev) => ({ ...prev, body: body }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    API.patch(`problems/${id}/`, { title: title, body: body, tags: tags })
      .then((response) => {
        console.log(
          "🚀 ~ file: EditQuestion.jsx ~ line 53 ~ .then ~ response",
          response
        );
        setMessage("Question updated successfull.");
        setSeverity("success");
        setSnackBarVisibility(true);
        navigate(`/questions/${response.data.id}`);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: EditQuestion.jsx ~ line 58 ~ handleSubmit ~ error",
          error
        );
        setMessage(error.message);
        setSeverity("error");
        setSnackBarVisibility(true);
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
              Edit Question - {id}
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
            onChange={(event) => {
              setTitle(event.target.value);
              setChanges((prev) => ({ ...prev, title: title }));
            }}
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
            value={options.length ? tags : ""}
            getOptionLabel={(option) => option.tag_name}
            limitTags={5}
            filterSelectedOptions
            loading
            onChange={(event, value) => {
              setTags(value);
              setChanges((prev) => ({ ...prev, tags: tags }));
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
            Update Your Question
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditQuestion;
