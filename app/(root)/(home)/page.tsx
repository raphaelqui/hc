/** @format */
"use client";
import { TransitionGroup } from "react-transition-group";
import React, { useEffect, useState } from "react";
import { Stack, Box, Typography, Hidden } from "@mui/material";
import NativePageSwitch from "@/components/molecules/NativePageSwitch";
import NativePage from "@/components/atoms/NativePage";
import the9th_logo from "@/assets/THE9TH_LOGO.svg";
import Image from "next/image";
import Badge from "@/components/atoms/Badge";
import Nav from "@/components/atoms/Nav";
import SwipeYControl from "@/components/atoms/SwipeYControl";

export default function Home() {

  const [option, setOption] = useState(0);

  const useHashChange = () => {
    useEffect(() => {
      const handleHashChange = () => {
        alert("" + window.location.hash);
      };

      window.addEventListener('hashchange', handleHashChange);

      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }, []);
  };

  useHashChange();

  return (
    <Stack
      sx={{
        width: "100%",
        background: "linear-gradient(165deg, white 25%, #ffcccc 100%)"
      }}>



      <Stack id="start" sx={{
        height: "100vh",
        opacity: "0.8",
        width: "100%",
        bgcolor: "#74b9ff"
      }}></Stack>

      <Stack id="customer" sx={{
        height: "100vh",
        opacity: "0.8",
        width: "100%",
        bgcolor: "#a29bfe"
      }}></Stack>

      <Stack id="employees" sx={{
        height: "100vh",
        opacity: "0.8",
        width: "100%",
        bgcolor: "#ffdd59"
      }}></Stack>

      <Stack id="contact" sx={{
        height: "100vh",
        opacity: "0.8",
        width: "100%",
        bgcolor: "#FEA47F"
      }}></Stack>

      <Stack id="hiring" sx={{
        height: "100vh",
        opacity: "0.8",
        width: "100%",
        bgcolor: "#FAA49F"
      }}></Stack>

      <Stack id="team" sx={{
        height: "100vh",
        opacity: "0.8",
        width: "100%",
        bgcolor: "#FEA47F"
      }}></Stack>

      <SwipeYControl levels={6} />

      <Nav option={option} />


    </Stack>
  );
}
