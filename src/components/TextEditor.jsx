import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Grid } from "@mui/material";

const TextEditor = ({ data, handleChange }) => {
  return (
    <Grid container flexDirection="column">
      <Grid item xs={12} sm={12} md={12} position="relative">
        <CKEditor
          editor={Editor}
          data={data}
          onReady={(editor) => {
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            handleChange(event, editor);
          }}
        />
      </Grid>
      <Grid
        item
        justifyContent="flex-end"
        alignItems="flex-end"
        padding={1}
      ></Grid>
    </Grid>
  );
};

export default TextEditor;
