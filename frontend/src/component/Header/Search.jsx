import React from "react";
import {
  Button,
  Box,
  FormControl,
  IconButton,
  InputBase,
  TextField,
} from "@mui/material";
import { useStyles } from "./styles/navStyle";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  let { searchBox, search } = useStyles();
  return (
    <Box className={searchBox} component="form">
      {/* <form> */}
      {/* <FormControl> */}
      <IconButton>
        <InputBase
          placeholder="search ......"
          color="secondary"
          elevation={0}
          //   onChange={handleInput}

          classes={{ root: search }}
        />
        <Button
          variant="contained"
          type="submit"
          disableElevation
          size="large"
          className="searchBtn"
        >
          {/* <A /> */}
          <FaSearch />
        </Button>
      </IconButton>
      {/* </form> */}
      {/* </FormControl> */}
    </Box>
  );
};

export default Search;
