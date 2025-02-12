import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../Components/SearchBar/SearchBar";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
SearchBox.propTypes = {};

function SearchBox() {
  return (
    <div className="search-box">
      <Box className="box-container">
        <Grid container size={12} spacing={12} textAlign={"center"}>
          <Grid size={12} spacing={4}>
            <Typography variant="h3">Search Directly</Typography>
            <Typography variant="body1" color="textSecondary">
              Ask any question to search database
            </Typography>
          </Grid>
          <Grid textAlign={"center"} size={8} m={"auto"}>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: "var(--primary)", fontSize: "28px" }}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <ArrowCircleRightTwoToneIcon
                    sx={{ color: "var(--primary)", fontSize: "28px" }}
                  />
                </InputAdornment>
              }
              placeholder="Tell us what you are researching"
              fullWidth
              sx={{ color: "var(--primary)", lineHeight: "1.5" }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default SearchBox;
