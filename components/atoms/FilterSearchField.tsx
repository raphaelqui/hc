/** @format */

import React, { useEffect, useState } from "react";
import { Stack, Typography, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import Grow from "@mui/material/Grow";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import { useFormContext, Controller } from "react-hook-form";
import { SxProps } from "@mui/system";

interface IFilterSearchField {
  label: string;
  name: string;
  loading: boolean;
  success: boolean;
  sx?: SxProps;
  onClick: () => void;
  onClickAway?: () => void;
}

const FilterSearchField: React.FunctionComponent<IFilterSearchField> = ({
  onClick,
  onClickAway = () => {},
  label,
  name,
  loading,
  success,
  sx = {},
}) => {
  const [open, setOpen] = useState(false);

  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (success) {
      setOpen(false);
    }
  }, [success]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (open) {
          onClickAway();
        }
        setOpen(false);
        setValue(name, "");
      }}>
      <Stack
        sx={{
          ...sx,
        }}>
        <Stack
          onClick={() => {
            onClick();
            if (open) {
              setOpen(false);
              onClickAway();
            } else {
              setOpen(true);
            }
          }}
          justifyContent={"center"}
          sx={{
            cursor: "pointer",
            height: 34,
            width: "auto",
            bgcolor: open ? "checkedInFont" : "#EDF0ED",
            px: 1.5,
          }}>
          <Typography
            sx={{
              textAlign: "center",
              color: open ? "#EDF0ED" : "checkedInFont",
              whiteSpace: "pre",
            }}
            variant='body2'>
            {label}
          </Typography>
        </Stack>

        <Grow
          in={open}
          addEndListener={(e) => {
            e.childNodes[0].childNodes[1].childNodes[0].childNodes[0].focus();
          }}
          style={{
            transitionDelay: "70ms",
          }}>
          <Stack
            sx={{
              position: "absolute",
              width: "100vw",
              left: 0,
              px: 1.125,
              top: 155,
              boxSizing: "border-box",
            }}>
            <Stack
              px={1}
              alignItems={"center"}
              justifyContent={"center"}
              direction={"row"}
              sx={{
                boxSizing: "border-box",
                width: "100%",
                height: 48,
                bgcolor: "#ecf0f196",
                backdropFilter: "blur(5px)",
                borderColor: "#7f8c8d",
                boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.16)",
                borderRadius: "2.75px",
              }}>
              <SearchIcon
                sx={{
                  color: "#b2bec3",
                }}
              />

              <Controller
                name={name}
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      placeholder='Suchbegriff'
                      sx={{
                        width: "100%",
                        justifyContent: "center",
                        height: "100%",
                        "& fieldset": {
                          display: "none",
                        },
                        "& input": {
                          fontWeight: 400,
                          fontSize: "0.85rem",
                          fontFamily: "roboto mono",
                          pr: 1,
                          pl: 0.75,
                          py: 0,
                          color: "#2d3436",
                        },
                        "& input::placeholder": {
                          color: "#636e72",
                        },
                      }}
                    />
                  );
                }}
              />

              <Stack pr={1}>
                {loading && (
                  <CircularProgress
                    size={23}
                    sx={{
                      right: "0px",
                      color: "#636e72",
                    }}
                  />
                )}
                {success && (
                  <CheckIcon
                    sx={{
                      color: "#b2bec3",
                    }}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Grow>
      </Stack>
    </ClickAwayListener>
  );
};

export default FilterSearchField;
