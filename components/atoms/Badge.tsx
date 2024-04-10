/** @format */

import React from "react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

interface IBadge {
  badgeContent: number;
}

const Badge: React.FunctionComponent<IBadge> = ({ badgeContent }) => {
  return (
    <Stack
      justifyContent={"center"}
      sx={{
        height: "100%",
      }}>
      <Typography
        variant='subtitle2'
        sx={{
          height: "auto",
          width: "auto",
          bgcolor: "white",
          px: 1,
          borderRadius: 30,
          color: "black",
        }}>
        {badgeContent}
      </Typography>
    </Stack>
  );
};

export default Badge;
