import React from "react";
import PropTypes from "prop-types";
import useRandomColor from "../../utils/useRandomColor";
import { Typography } from "@mui/material";
import "./styles.scss";

NameTag.propTypes = {
  data: PropTypes.string,
  defaultColor: PropTypes.string,
};

function NameTag({
  data,
  defaultColor,
}: {
  data: string;
  defaultColor: string;
}) {
  const color = defaultColor ? defaultColor : useRandomColor();
  return (
    <div className="rounded-tag" style={{ border: `1px solid ${color}` }}>
      <Typography variant="body1" sx={{ color: `${color}` }}>
        {data}
      </Typography>
    </div>
  );
}

export default NameTag;
