import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  styled,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    padding: "0rem 0.5rem",
    "& fieldset": {
      borderRadius: 100,
    },
  },
});

const SearchBar = ({ defaultSearchQuery, setDefaultSearchQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState("");
  
  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (searchQuery)
          setSearchParams({
            search: searchQuery,
          });
        else setSearchParams();
        setDefaultSearchQuery(searchQuery);
        // console.log(  );
      }}
      method="get"
    >
      <RoundedTextField
        fullWidth
        defaultValue={defaultSearchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        placeholder="Search..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
