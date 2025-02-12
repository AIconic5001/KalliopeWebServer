import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import "./styles.scss";
ButtonGrid.propTypes = {};

function ButtonGrid() {
  return (
    <div className="button-grid-container">
      <Grid container spacing={2}>
        <Grid size={4}>
          <Button variant="outlined" color="secondary" fullWidth>
            View Full Synopsis
          </Button>
        </Grid>
        <Grid size={4}>
          <Button variant="outlined" color="secondary" fullWidth>
            Recommendations
          </Button>
        </Grid>
        <Grid size={4} textAlign={"center"}>
          <Button variant="outlined" color="secondary" fullWidth>
            Citation Timeline
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ButtonGrid;
