import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import TopicBox from "./TopicBox";
import SearchBox from "./SearchBox";

PromptingFeat.propTypes = {};

function PromptingFeat() {
  return (
    <section className="prompt-container" id="prompt">
      <Grid container spacing={3}>
        <Grid size={12} mb={12}>
          <Typography variant="h1" align="center" className="title">
            Find your next research papers
          </Typography>
          <Typography variant="body1" align="center">
            If you have a question, we have the answer. Let us help you find the
            right research papers for your needs.
          </Typography>
        </Grid>
        <Grid container size={12} spacing={3} flexDirection={"row"}>
          <Grid size={6}>
            <SearchBox />
          </Grid>
          <Grid size={6}>
            <TopicBox />
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}

export default PromptingFeat;
