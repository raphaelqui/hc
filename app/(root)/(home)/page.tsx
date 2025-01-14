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
import SwipeYFrame from "@/components/atoms/SwipeYFrame";
import SwipeYHorizontal from "@/components/atoms/SwipeYHorizontal";

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

  const sections = [
    {
      text: "Start",
      id: "start",
      bg: "blue",
      children: (<></>) // diese children hier finden sich im organisms folder betrachten?
    }, {
      text: "Für Kunden",
      id: "customer",
      bg: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
      children: (<></>)
    }, {
      text: "Für Mitarbeiter",
      id: "employees",
      bg: "linear-gradient(to bottom, #eecda3, #ef629f)",
      children: (<></>)
    }, {
      text: "Kontaktinfos",
      id: "contact",
      children: (<></>),
      bg: "linear-gradient(to top, #eecda3, #ef629f)",
    }, {
      text: "Stellenangebote",
      id: "hiring",
      bg: "linear-gradient(to bottom, #eecda3, #ef629f)",
      children: (<></>)
    }, {
      text: "Das Team",
      id: "team",
      bg: "linear-gradient(to top, #e0eafc, #cfdef3)",
      children: (<></>)
    }
  ];

  return (
    <Stack
      sx={{
        width: "100%",
        background: "linear-gradient(165deg, white 25%, #ffcccc 100%)"
      }}>


      <SwipeYControl>
        {/* SwipeYFrame - Sequenz 1 */}
        {...(sections.map(({ id, children, bg }) => {
          return (<SwipeYFrame name={id} bg={bg}>{children}</SwipeYFrame>);
        }))}
        {/* SwipeYHorizontal - Sequenz 2 */}
        <SwipeYHorizontal>
          <Stack sx={{
            height: 560,
            width: "100%",
          }}>
          </Stack>
          <Typography>Hallo wie gehts?</Typography>
          <Stack sx={{
            height: 560,
            width: "100%",
          }}>
          </Stack>
        </SwipeYHorizontal>

        {/* SwipeYFrame - Sequenz 3 */}
        {...(sections.map(({ id, children, bg }) => {
          return (<SwipeYFrame name={id} bg={bg}>{children}</SwipeYFrame>);
        }))}
        {/* SwipeYHorizontal - Sequenz 2 */}
        <SwipeYHorizontal>
          <Stack sx={{
            height: 560,
            width: "100%",
          }}>
          </Stack>
          <Typography>Hallo wie gehts?</Typography>
          <Stack sx={{
            height: 560,
            width: "100%",
          }}>
          </Stack>
        </SwipeYHorizontal>

        {/* SwipeYFrame - Sequenz 3 */}
        {...(sections.map(({ id, children, bg }) => {
          return (<SwipeYFrame name={id} bg={bg}>{children}</SwipeYFrame>);
        }))}


      </SwipeYControl>

      <Nav option={option} options={sections} />


    </Stack>
  );
}
