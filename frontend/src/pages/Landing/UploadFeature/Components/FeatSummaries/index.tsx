import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
FeatSummaries.propTypes = {};

function FeatSummaries() {
  return (
    <Grid
      className="feat-summaries-container"
      spacing={2}
      container
      mt={4}
      mr={4}
      ml={4}
    >
      <Grid size={1}></Grid>
      <Grid size={4}>
        <Typography variant="body1">
          Provide insights into research paper: synopsis, research method,
          findings, limitations and insights into the relevance of used
          citations
        </Typography>
      </Grid>
      <Grid size={1}></Grid>

      <Grid container size={6} spacing={1}>
        <Grid container size={12} alignContent={"center"}>
          <CheckBoxTwoToneIcon
            sx={{ color: "var(--primary)", fontSize: "28px" }}
          />
          <Typography variant="body1">
            Our Tool only takes in PDF files for now
          </Typography>
        </Grid>
        <Grid container size={12} alignContent={"center"}>
          <CheckBoxTwoToneIcon
            sx={{ color: "var(--primary)", fontSize: "28px" }}
          />
          <Typography variant="body1">
            Only 1 file can be uploaded at a time
          </Typography>
        </Grid>
        <Grid container size={12} alignContent={"center"}>
          <CheckBoxTwoToneIcon
            sx={{ color: "var(--primary)", fontSize: "28px" }}
          />
          <Typography variant="body1">
            It usually takes a few minutes to process a file. Larger files may
            take longer to process
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeatSummaries;
