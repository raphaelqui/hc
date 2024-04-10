/** @format */
"use client";
import { Stack, Box, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { INativePage } from "@/components/atoms/NativePage";
import NavigationIcon from "@mui/icons-material/Navigation";

interface INativePageSwitch {
  children: Array<React.ReactElement<INativePage>>;
  start?: number;
}

const NativePageSwitch: React.FunctionComponent<INativePageSwitch> = ({
  children,
  start = 0,
}) => {
  const [select, setSelect] = useState(start);
  const [titleWidth, setTitleWidth] = useState(0);
  const [computedLeft, setComputedLeft] = useState(0);
  const navBar = useRef(null);
  useEffect(() => {
    computeSelector(select);
  }, []);
  // this function compute the position of the selector indicator
  const computeSelector = (index: number) => {
    const navBarT: any = navBar.current;
    const navBarChildren = navBarT.childNodes;
    const styles = window.getComputedStyle(navBarChildren[index]);
    const width = styles.width;
    const mxSum = styles.getPropertyValue("margin-left");
    setTitleWidth(parseFloat(width) + parseFloat(mxSum) * 2);
    let computeLeft = 0;
    for (let i = 0; i < navBarChildren.length && i < index; i++) {
      computeLeft += navBarChildren[i].clientWidth + parseFloat(mxSum) * 2;
    }
    setComputedLeft(computeLeft);
  };
  return (
    <Stack mb={5}>
      <Stack
        direction={"row"}
        ref={navBar}
        sx={{
          width: "auto",
          px: 1,
          zIndex: 1,
        }}>
        {children.map((child, index) => {
          return (
            <Stack
              onClick={(e) => {
                setSelect(index);
                computeSelector(index);
              }}
              key={index}
              justifyContent={"center"}
              sx={{
                cursor: "pointer",
                position: "relative",
              }}
              columnGap={1}
              mx={"auto"}
              py={2}
              direction={"row"}>
              {child.props.startAdornment && child.props.startAdornment}
              {child.props.title && (
                <Typography variant='subtitle1'>{child.props.title}</Typography>
              )}
              {child.props.endAdornment && child.props.endAdornment}
            </Stack>
          );
        })}
      </Stack>
      <Stack mx={1} direction={"row"}>
        <Stack
          ml={computedLeft + "px"}
          sx={{
            zIndex: 1,
            transition: "all ease-in-out 0.35s",
            width: titleWidth,
            height: 4,
            position: "absolute",
            bgcolor: "#4b7bec",
          }}>
          <NavigationIcon
            sx={{
              alignSelf: "center",
              position: "absolute",
              transform: "translateY(-50%)",
              color: "#4b7bec",
            }}
          />
          <Box
            sx={{
              alignSelf: "center",
              position: "absolute",
              height: 10,
              top: "100%",
              width: 20,
              bgcolor: "white",
            }}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          mt: 4,
          width: "100%",
          height: "auto",
        }}>
        {children[select].props.children && children[select].props.children}
      </Stack>
    </Stack>
  );
};

export default NativePageSwitch;
