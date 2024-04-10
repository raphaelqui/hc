/** @format */
import React, { useEffect, useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import SwipeSubmit from "./SwipeSubmit";
import CopyToClipboard from "@/components/atoms/CopyToClipboard";
import { useSnackbar } from "@/context/SnackbarContext";
import { palette } from "@/theme";
interface SnackbarState {
  setSnackbarState: (arg0: object) => void;
  // Weitere Eigenschaften und Methoden
}

interface ITile {
  checkedIn?: false;
  name?: any;
  email?: String;
  id?: Number;
  infos?: any;
  checkInToggle: () => void;
}

const Tile: React.FunctionComponent<ITile> = ({
  checkedIn,
  name,
  email,
  id,
  infos,
  checkInToggle,
}) => {
  const { setSnackbarState } = useSnackbar() as SnackbarState;
  const [open, setOpen] = useState(false);
  const [checkInBool, setCheckInBool] = useState(checkedIn);
  let resName;
  let resInfos;
  let nameStr = name;

  let tmpStr = name.split("/*");
  resName = [tmpStr[0]];
  if (tmpStr.length > 1) {
    tmpStr = tmpStr[1].split("*/");
    resName = resName.concat(tmpStr);
    nameStr = resName.join("");
    resName = resName.map((item, index) => {
      return (
        <div
          key={"marked-font-" + index}
          style={{
            display: "inline",
            backgroundColor: index === 1 ? "#d1ddfa" : "none",
          }}>
          {item}
        </div>
      );
    });
  } else {
    resName = name;
  }
  tmpStr = infos.split("/*");
  resInfos = [tmpStr[0]];
  if (tmpStr.length > 1) {
    tmpStr = tmpStr[1].split("*/");
    resInfos = resInfos.concat(tmpStr);
    resInfos = resInfos.map((item, index) => {
      return (
        <div
          key={"marked-font-" + index}
          style={{
            display: "inline",
            backgroundColor: index === 1 ? "#d1ddfa" : "none",
          }}>
          {item}
        </div>
      );
    });
  } else {
    resInfos = infos;
  }

  useEffect(() => {
    if (open) {
      checkInToggle();
      if (checkInBool) {
        setSnackbarState({
          info: nameStr + " wurde erfolgreich eingecheckt!",
        });
      } else {
        setSnackbarState({
          info: nameStr + " wurde erfolgreich ausgecheckt!",
        });
      }
    }
  }, [checkInBool]);

  const checkInPerson = () => {
    fetch(
      `https://datenhaushalt.the9th.co/mockservice/rest/checkin/byId?id=${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Basic VGhlLlRlc3RlcjombXlQd2Q6MDEwMTAx",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCheckInBool(checkInBool && !checkInBool);
      });
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
      }}>
      <Stack
        sx={{
          px: 2.5,
          cursor: "pointer",
          "&:hover": {
            bgcolor: "#f5f6fa",
          },
          bgcolor: open ? "#f5f6fa" : "white",
        }}>
        <Stack
          onClick={(e) => {
            setOpen(!open);
          }}
          direction={"row"}
          alignItems={"center"}
          sx={{
            height: "auto",
            width: "100%",
            py: 0.5,
            boxSizing: "border-box",
            cursor: "pointer",
          }}>
          <Box
            sx={{
              height: 12,
              width: 12,
              bgcolor: checkInBool ? palette.checkedIn : palette.notCheckedIn,
              borderRadius: 1,
            }}
          />
          <Stack
            width={"100%"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <Stack
              sx={{
                height: " 100%",
                py: 1,
                ml: 1,
              }}>
              <Typography variant='h6'>{resName}</Typography>
              <Typography variant='body1'>{email}</Typography>
            </Stack>
            <Typography width={180} textAlign={"right"} variant='body2'>
              {resInfos}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          rowGap={1}
          sx={{
            transition: "height ease-in-out 0.2s",
            height: open ? 145 : 0,
            overflow: "hidden",
          }}>
          <Stack ml={"auto"}>
            <SwipeSubmit
              name={name}
              start={checkInBool}
              onSubmit={checkInPerson}
            />
          </Stack>
          <Stack ml={"auto"} width={218}>
            <CopyToClipboard value={email} />
          </Stack>
        </Stack>
      </Stack>
    </ClickAwayListener>
  );
};

export default Tile;
