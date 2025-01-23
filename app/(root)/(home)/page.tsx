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
import SwipeXYControl from "@/components/atoms/SwipeXYControl";
import SwipeXYElement from "@/components/atoms/SwipeXYElement";
import SwipeXYHorizontal from "@/components/atoms/SwipeXYHorizontal";

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
    <Stack>

      <SwipeXYControl startXY="4/3">

        <SwipeXYElement>
          <Stack sx={{
            minHeight: "100vh",
            width: "100%",
            background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",

          }}>

          </Stack>
        </SwipeXYElement>

        <SwipeXYElement>
          <Stack sx={{
            width: "100%",
            minHeight: "100vh",
            background: "rgba(0,0,0,0.05)",
          }}></Stack>
        </SwipeXYElement>
        <SwipeXYElement>
          <Stack sx={{
            width: "100%",
            minHeight: "100vh",
            background: "rgba(0,0,0,0.05)",
          }}></Stack>
        </SwipeXYElement>


        <SwipeXYHorizontal>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to bottom, #eecda3, #ef629f)",
            }}>
              _horizontal_1
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement startX={true}>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
            }}>
              _horizontal_2
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #e0eafc, #cfdef3)",
            }}>
              _horizontal_3

            </Stack>
          </SwipeXYElement>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to bottom, #eecda3, #ef629f)",
            }}>
              _horizontal_4
            </Stack>
          </SwipeXYElement>
        </SwipeXYHorizontal>


        <SwipeXYElement>
          <Stack sx={{
            minHeight: "100%",
            width: "100%",
            background: "linear-gradient(to bottom, #eecda3, #ef629f)",
          }}>
            _vertical
          </Stack>
        </SwipeXYElement>


        <SwipeXYElement>
          <Stack sx={{
            minHeight: "100%",
            width: "100%",
            background: "linear-gradient(to bottom, #eecda3, #ef629f)",
          }}>
            _vertical
          </Stack>
        </SwipeXYElement>


        <SwipeXYHorizontal>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to bottom, #eecda3, #ef629f)",
            }}>
              _horizontal_1
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
            }}>
              _horizontal_2
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement startX={true}>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
            }}>
              _horizontal_3
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
            }}>
              _horizontal_4
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
            }}>
              _horizontal_5
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
            }}>
              _horizontal_6
            </Stack>
          </SwipeXYElement>
        </SwipeXYHorizontal>


        <SwipeXYElement>
          <Stack sx={{
            minHeight: "100%",
            width: "100%",
            background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
          }}>
            _vertical
          </Stack>
        </SwipeXYElement>

        <SwipeXYElement>
          <Stack sx={{
            minHeight: "100%",
            width: "100%",
            background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
          }}>
            _vertical
          </Stack>
        </SwipeXYElement>

        <SwipeXYElement>
          <Stack sx={{
            minHeight: "100%",
            width: "100%",
            background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
          }}>
            _vertical
          </Stack>
        </SwipeXYElement>

        <SwipeXYHorizontal>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
            }}>
              _horizontal_1
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement startX={true}>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #FAFFD1, #A1FFCE)",
            }}>
              _horizontal_2
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to top, #e0eafc, #cfdef3)",
            }}>
              _horizontal_3
            </Stack>
          </SwipeXYElement>
        </SwipeXYHorizontal>

      </SwipeXYControl>

      {
        /*
        also hier haben wir jetzt die Matrix, wir können nun damit beginnen
        die verschiedenen Elemente so programmieren, 
     
        snapschots 
     
     
        <SwipeYControl>
          {...(sections.map(({ id, children, bg }) => {
            return (<SwipeYFrame name={id} bg={bg}>{children}</SwipeYFrame>);
          }))}
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
          {...(sections.map(({ id, children, bg }) => {
            return (<SwipeYFrame name={id} bg={bg}>{children}</SwipeYFrame>);
          }))}
        </SwipeYControl>
        */
      }
      <Nav option={option} options={sections} />


    </Stack >
  );
}
