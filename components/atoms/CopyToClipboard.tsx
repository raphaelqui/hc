/** @format */

import React from "react";
import {
  Stack,
  Tooltip,
  Typography,
  Box,
  TextField,
  ClickAwayListener,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface ICopyToClipbaord {
  value: String;
}

const CopyToClipboard: React.FunctionComponent<ICopyToClipbaord> = ({
  value,
}) => {
  const [tool, setTool] = React.useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value).then(() => {
      setTool(true);
    });
  };

  return (
    <Stack
      px={1}
      py={0.8}
      sx={{
        position: "relative",
        bgcolor: "white",
        border: "1px solid #ecf0f1",
      }}>
      <Stack direction={"row"}>
        <TextField
          value={value}
          sx={{
            justifyContent: "center",
            "& fieldset": {
              display: "none",
            },
            "& input": {
              fontWeight: 400,
              fontSize: "0.75rem",
              fontFamily: "roboto mono",
              pr: 2,
              pl: 1,
              py: 1.25,
              color: "#2d3436",
            },
            "& input::placeholder": {
              color: "#636e72",
            },
          }}
        />
        <div
          onClick={() => {
            handleCopyToClipboard();
            setTimeout(() => {
              setTool(false);
            }, 800);
          }}>
          <Tooltip open={tool} placement='top' arrow title='Copied!'>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                height: "100%",
                width: "60px",
                bgcolor: "#ecf0f1",
              }}>
              <ContentCopyIcon
                sx={{
                  color: "#4D6D5E",
                  fontSize: "1.125rem",
                }}
              />
            </Stack>
          </Tooltip>
        </div>
      </Stack>
    </Stack>
  );
};

export default CopyToClipboard;
