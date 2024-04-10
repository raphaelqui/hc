/** @format */
import useCountdownTimer from "@/hooks/useCountdownTimer";
import React, { useState, useEffect, Component, useRef } from "react";
import { Stack, Box, Typography, Fade } from "@mui/material";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Grow from "@mui/material/Grow";
import CheckIcon from "@mui/icons-material/Check";
import { useSnackbar } from "@/context/SnackbarContext";

interface ISwipeSubmit {
  name: string;
  onSubmit: () => void;
  start: any;
}

const SwipeSubmit: React.FC<ISwipeSubmit> = ({ name, onSubmit, start }) => {
  const elem = useRef<HTMLDivElement>(null);
  const parentElem = useRef<HTMLDivElement>(null);
  const [swiped, setSwiped] = useState(start);
  let startingPoint: any;
  let startX: any;
  let offsetX: number = 0;
  let mouseDown: boolean = false;
  let parentElemWidth: any;
  let elemWidth: any;

  React.useEffect(() => {
    const box = elem.current;
    parentElemWidth = parentElem.current?.clientWidth;
    elemWidth = elem.current?.clientWidth;
    startingPoint = elem.current?.style.transform;

    if (swiped) {
      elem.current!.style.transform = `translateX(${parentElemWidth - elemWidth}px)`;
    }

    if (box) {
      box.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (box) {
        box.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const handleMouseDown = (e: MouseEvent) => {
    elem.current!.style.zIndex = "510";
    startingPoint = elem.current?.style.transform;
    if (
      elem.current?.style.transform ===
      `translateX(${parentElemWidth - elemWidth}px)`
    ) {
      startX = parentElemWidth;
    } else {
      startX = e.clientX;
    }
    mouseDown = true;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (mouseDown) {
      controlOffset();
    }
    mouseDown = false;
  };

  const controlOffset = () => {
    elem.current!.style.transitionDuration = "0.3s";
    if (offsetX < (parentElemWidth - elemWidth) / 2) {
      elem.current!.style.transform = `translateX(0px)`;
      if (startingPoint !== elem.current!.style.transform) {
        onSubmit();
        setSwiped(false);
      }
    } else {
      elem.current!.style.transform = `translateX(${parentElemWidth - elemWidth}px)`;
      if (startingPoint !== elem.current!.style.transform) {
        setSwiped(true);
        onSubmit();
      }
    }
    setTimeout(() => {
      elem!.current!.style.transitionDuration = "0s";
    }, 300);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (mouseDown) {
      if (elem.current && elem.current.style) {
        const { clientX } = e;
        offsetX = clientX - startX;
        if (offsetX > 0 && offsetX < parentElemWidth - elemWidth) {
          elem.current.style.transform = `translateX(${offsetX}px)`;
        }
      }
    }
  };
  const snackBool = useCountdownTimer(swiped, 2000);
  return (
    <>
      <Stack
        px={1}
        py={0.8}
        sx={{
          bgcolor: "white",
          border: "1px solid #ecf0f1",
        }}>
        <Stack
          alignItems={"center"}
          ref={parentElem}
          direction={"row"}
          sx={{
            bgcolor: "white",
            height: 45,
            width: 200,
            position: "relative",
            overflow: "hidden",
          }}>
          <Grow
            in={swiped}
            timeout={{ enter: 500, exit: 0 }}
            style={{
              position: "absolute",
              zIndex: 505,
            }}>
            <Typography
              variant='body1'
              sx={{
                pl: 1,
                display: "flex",
                alignItems: "center",
              }}>
              revedieren
            </Typography>
          </Grow>

          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            ref={elem}
            sx={{
              transition: "all ease-in-out 0s",
              position: "absolute",
              height: 45,
              width: 70,
              bgcolor: swiped ? "#ffe7e6" : "#ecf0f1",
              userSelect: "none",
              zIndex: 500,
            }}
            style={{
              transform: "translateX(0px)",
            }}>
            <KeyboardDoubleArrowRightIcon
              sx={{
                transform: swiped ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "all ease-in-out 0.3s",
                fontSize: "1.5rem",
                color: swiped ? "#FF5B4E" : "#4D6D5E",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                width: "300%",
                bgcolor: "white",
                top: 0,
                ...(!swiped && { right: "100%" }),
                ...(swiped && { left: "100%" }),
              }}
            />
          </Stack>
          <Grow in={!swiped} timeout={{ enter: 500, exit: 0 }}>
            <Typography variant='body1' ml={"auto"} px={1}>
              einchecken
            </Typography>
          </Grow>
        </Stack>
      </Stack>
    </>
  );
};

export default SwipeSubmit;
