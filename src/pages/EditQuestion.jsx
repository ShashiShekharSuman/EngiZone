import {
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Avatar,
  Autocomplete,
  Chip,
} from "@mui/material";
import React from "react";
import TextEditor from "../components/TextEditor";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate, useParams } from "react-router-dom";
import API from "../axios";

const EditQuestion = () => {
  const { id } = useParams();

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [changes, setChanges] = React.useState({});
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

        navigate(`/questions/${response.data.id}`);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: EditQuestion.jsx ~ line 58 ~ handleSubmit ~ error",
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
            value={tags}
            getOptionLabel={(option) => option.tag_name}
            limitTags={2}
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
            // renderOption={(props, option, { selected }) => (
            //   <li {...props}>
            //     <Checkbox
            //       icon={icon}
            //       checkedIcon={checkedIcon}
            //       style={{ marginRight: 8 }}
            //       checked={selected}
            //     />
            //     {option.title}
            //   </li>
            // )}
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
