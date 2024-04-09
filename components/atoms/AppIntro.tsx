/** @format */

"use client";

import React, { useEffect, useState, useRef } from "react";
import { Stack, Dialog } from "@mui/material";
import AppVideo from "@/assets/IntroAnimation.mp4";

interface IAppIntro {}

const AppIntro: React.FunctionComponent<IAppIntro> = () => {
  const videoRef = useRef(null);
  const intro = useRef(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      videoRef.current.style.opacity = "0";
    }, 1900);
    setTimeout(() => {
      console.log(intro.current.style.height);
      intro.current.style.height = "57px";
    }, 2400);
    setTimeout(() => {
      intro.current.style.zIndex = 1;
    }, 2600);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      console.log(videoRef.current);
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
        <source src={AppVideo} type='video/mp4' />
      </video>
    </Stack>
  );
};
export default AppIntro;
