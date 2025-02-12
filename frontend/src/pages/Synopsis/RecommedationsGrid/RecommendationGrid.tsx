import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import { SummariesDataType } from "../../../@types/SynopsisData/grid.type";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

SummariesGrid.propTypes = {};

function SummariesGrid({ data }: { data: SummariesDataType }) {
  const keys = Object.keys(data) as Array<keyof typeof data>;
  return (
    <div>
      <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
        {keys.map((key) => (
          <Grid container key={key} size={4}>
            <Grid size={12}>
              <Typography variant="h6" align="center">
                {key}
              </Typography>
            </Grid>
            <Grid size={12} pt={2} borderTop={1}>
              <Typography variant="h6">{data[key]}</Typography>
            </Grid>
          </Grid>
        ))}
      </Stack>
    </div>
  );
}

export default SummariesGrid;
