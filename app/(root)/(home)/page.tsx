/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Nav from "@/components/atoms/Nav";
import SwipeXYControl from "@/components/atoms/SwipeXYControl";
import SwipeXYElement from "@/components/atoms/SwipeXYElement";
import SwipeXYHorizontal from "@/components/atoms/SwipeXYHorizontal";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
export default function Home() {

  /*
    PROJEKT-TODOS
      -> wie bekomme ich die <SwipeXYControl> Komponente dazu
         das diese nicht mehr doppelt rendert?
      
  
  */
  const [xy, setXY] = useState("2/0");
  let options = [
    {
      text: "Start",
      icon: HomeOutlinedIcon,
      id: "start",
      xy: "2/0",
      active: xy == "2/0",
    }, {
      text: "Für Kunden",
      icon: GroupOutlinedIcon,
      id: "customer",
      xy: "2/1",
      active: xy == "2/1",
    }, {
      text: "Für Mitarbeiter",
      icon: BadgeOutlinedIcon,
      id: "employees",
      xy: "2/2",
      active: xy == "2/2",
    }, {
      text: "Kontaktinfos",
      icon: ConnectWithoutContactOutlinedIcon,
      id: "contact",
      xy: "2/3",
      active: xy == "2/3",
    }, {
      text: "Stellenangebote",
      icon: PersonAddAltOutlinedIcon,
      id: "hiring",
      xy: "2/4",
      active: xy == "2/4",
    }, {
      text: "Das Team",
      icon: GroupsOutlinedIcon,
      id: "team",
      xy: "2/5",
      active: xy == "2/5",
    }
  ];

  return (
    <Stack sx={{
      position: "relative",
      height: "100vh",
      width: "100vw",
    }}>

      <SwipeXYControl xy={xy} changeXY={(str: string) => {
        setXY(str);
      }} >

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

      <Nav options={options} changeXY={(str: string) => {
        setXY(str);
      }} />


    </Stack >
  );
}
