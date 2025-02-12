import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import { SummariesDataType } from "../../../@types/SynopsisData/grid.type";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import "./styles.scss";

SummariesGrid.propTypes = {};

function SummariesGrid({ data }: { data: SummariesDataType }) {
  const keys = Object.keys(data) as Array<keyof typeof data>;
  return (
    <div>
      <Grid spacing={0} container>
        {keys.map((key) => (
          <Grid size={3} height={"40px"} key={key} className="summary-grid">
            <Typography variant="h6" align="center">
              {key}
            </Typography>
          </Grid>
        ))}
        <Grid container spacing={4}>
          {" "}
          {keys.map((key) => (
            <Grid container key={key} size={3}>
              <Grid size={12} pt={2} borderTop={1} className="summary-grid">
                <Typography variant="body1" align="justify">
                  {data[key]}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default SummariesGrid;
