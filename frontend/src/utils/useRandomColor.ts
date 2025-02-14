import React, { useEffect } from "react";

export default function useRandomColor() {
  const [color, setColor] = React.useState("#000000");
  const curVal = "#" + Math.floor(Math.random() * 16777215).toString(16);
  useEffect(() => {
    setColor(curVal);
  }, []);
  return color;
}
