import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import YoutubeSearchedForTwoToneIcon from "@mui/icons-material/YoutubeSearchedForTwoTone";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import TimelineTwoToneIcon from "@mui/icons-material/TimelineTwoTone";
FeatureSection.propTypes = {};

function FeatureSection() {
  return (
    <div className="feature-container">
      <div className="feature-header"></div>
      <Grid container spacing={8}>
        <Grid size={12}>
          <Typography variant="h1" align="center" id="features">
            Our Features
          </Typography>
        </Grid>
        <Grid container size={12} spacing={12}>
          <Grid size={6}>
            <div className="feature-box">
              <a href="#upload">
                <Grid container spacing={1}>
                  <Grid size={12}>
                    <ArticleTwoToneIcon
                      sx={{ fontSize: "60px", color: "var(--primary)" }}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="h3" className="subtitle-color">
                      Research Paper Summary
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="body1">
                      Provides a comprehensive research paper summary covering
                      the synopsis, research methods, results, and limitations
                      from any uploaded paper.
                    </Typography>
                  </Grid>
                </Grid>
              </a>
            </div>
          </Grid>
          <Grid size={6}>
            <div className="feature-box">
              <Grid container spacing={1}>
                <a href="#prompt">
                  <Grid size={12}>
                    <YoutubeSearchedForTwoToneIcon
                      sx={{ fontSize: "60px", color: "var(--primary)" }}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="h3" className="subtitle-color">
                      Reverse Recommendation
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="body1">
                      Recommends users with most 3 related papers our database
                      based on keywords and topics.
                    </Typography>
                  </Grid>
                </a>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid container size={12} spacing={12}>
          <Grid size={6}>
            <div className="feature-box">
              <a href="#upload">
                <Grid container spacing={1}>
                  <Grid size={12}>
                    <BookmarkAddedTwoToneIcon
                      sx={{ fontSize: "60px", color: "var(--primary)" }}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="h3" className="subtitle-color">
                      Save Related Papers
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="body1">
                      Enables users to save and share collection of related
                      research papers
                    </Typography>
                  </Grid>
                </Grid>
              </a>
            </div>
          </Grid>
          <Grid size={6}>
            <div className="feature-box">
              <a href="#upload">
                <Grid container spacing={1}>
                  <Grid size={12}>
                    <TimelineTwoToneIcon
                      sx={{ fontSize: "60px", color: "var(--primary)" }}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="h3" className="subtitle-color">
                      Research Paper Timeline
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="body1">
                      Visualizes the research paper timeline, including the
                      publication date, citation count, and the number of
                      references.
                    </Typography>
                  </Grid>
                </Grid>
              </a>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default FeatureSection;
