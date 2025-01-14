/** @format */
"use client";

import React, { useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import AppIntroVideo from "@/assets/IntroAnimation.mp4";
interface IAppIntro {}

const AppIntro: React.FunctionComponent<IAppIntro> = () => {
  const videoRef: any = useRef(null);
  const intro: any = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      videoRef.current.style.opacity = "0";
    }, 1900);
    setTimeout(() => {
      intro.current.style.height = "0px";
    }, 2500);
    setTimeout(() => {
      intro.current.style.zIndex = 1;
    }, 2600);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current?.play();
    }
  }, []);

  return (
    <Stack
      ref={intro}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        maxWidth: "100vw",
        transition: "height ease-in-out 0.3s",
        width: "100%",
        height: "100vh",
        bgcolor: "black",
        position: "absolute",
        zIndex: 100,
        overflow: "hidden",
      }}>
      <video
        style={{
          opacity: "1",
          transition: "opacity ease-in-out 0.5s",
        }}
        ref={videoRef}
        muted
        autoPlay
        width='460'
        height='auto'>
        <source src={AppIntroVideo} type='video/mp4' />
      </video>
    </Stack>
  );
};
export default AppIntro;
