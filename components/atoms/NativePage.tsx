/** @format */
import { Stack, Box } from "@mui/material";
import React from "react";

export interface INativePage {
  title?: String;
  children?: React.ReactNode;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const NativePage: React.FunctionComponent<INativePage> = ({
  children,
  title,
  endAdornment,
  startAdornment,
}) => {
  return <>{children}</>;
};

export default NativePage;
