/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Nav from "@/components/atoms/Nav";
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
    }, {
      text: "Für Kunden",
      id: "customer",
    }, {
      text: "Für Mitarbeiter",
      id: "employees",
    }, {
      text: "Kontaktinfos",
      id: "contact",
    }, {
      text: "Stellenangebote",
      id: "hiring",
    }, {
      text: "Das Team",
      id: "team",
    }
  ];

  return (
    <Stack sx={{
      position: "relative",
      height: "100vh",
      width: "100vw",
    }}>


      <SwipeXYControl startXY="2/3">

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

      <Nav option={option} options={sections} />


    </Stack >
  );
}
