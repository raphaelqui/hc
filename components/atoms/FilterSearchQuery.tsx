/** @format */
import { SxProps } from "@mui/system";
import { Stack, Box, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { palette } from "@/theme";

interface IFilterSearchQuery {
  sx?: SxProps;
  value: String;
  removeQuery: () => void;
}

const FilterSearchQuery: React.FunctionComponent<IFilterSearchQuery> = ({
  sx = {},
  value,
  removeQuery,
}) => {
  return (
    <Stack
      onClick={removeQuery}
      direction={"row"}
      sx={{
        display: value.length > 0 ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        px: 1.5,
        bgcolor: palette.checkedInFont,
        cursor: "pointer",
        height: 34,
        ...sx,
      }}>
      <Typography
        sx={{
          textAlign: "center",
          whiteSpace: "pre",
          color: "#EDF0ED",
        }}
        variant='body1'>
        {`"${value}"`}
      </Typography>
      <CloseIcon
        sx={{
          ml: 1,
          fontSize: "0.8125rem",
          color: "#d5dcd5",
        }}
      />
    </Stack>
  );
};
export default FilterSearchQuery;
