/** @format */
"use client";

import React, { useEffect, useRef } from "react";
import { Stack, Typography, Box } from "@mui/material";
import AppIntroVideo from "@/assets/IntroAnimation.mp4";
interface IAppIntro { }

const AppIntro: React.FunctionComponent<IAppIntro> = () => {
  // const videoRef: any = useRef(null);
  const intro: any = useRef(null);
  const loading: any = useRef(null);
  const wrapper: any = useRef(null);
  useEffect(() => {
    loading.current.style.width = "100%";
    setTimeout(() => {
      wrapper.current.style.opacity = "0";
      // videoRef.current.style.opacity = "0";
    }, 1200);
    setTimeout(() => {
      intro.current.style.height = "0px";
    }, 1800);
    setTimeout(() => {
      intro.current.style.zIndex = 1;
    }, 1900);
  }, []);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current?.play();
  //   }
  // }, []);

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
        bgcolor: "white",
        position: "absolute",
        zIndex: 100,
        overflow: "hidden",
      }}>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          transform: "translateY(-30px)",
          transition: "1s ease-in-out",
          width: "100%",
        }} ref={wrapper}>
        <Typography variant="body1">Harmoni Cares</Typography>
        <Stack sx={{
          marginTop: 1,
          width: 75,
          height: 2.5,
          bgcolor: "rgba(0,0,0,0.1)"
        }}>
          <Box ref={loading} sx={{
            height: "100%",
            width: "0%",
            bgcolor: "rgba(0,0,0,0.6)",
            transition: "1s ease-in-out",
          }} />
        </Stack>
      </Stack>
      {/* <video
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
      </video> */}
    </Stack>
  );
};
export default AppIntro;
