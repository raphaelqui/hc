/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
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

      -> als nächstes schauen wir uns den onc-Fall genauer an.
      
  
  */
  const [xy, setXY] = useState("0/0");
  let options = [
    {
      text: "Start",
      icon: HomeOutlinedIcon,
      id: "start",
      xy: "3/0",
      active: xy == "3/0",
    }, {
      text: "Für Kunden",
      icon: GroupOutlinedIcon,
      id: "customer",
      xy: "3/1",
      active: xy == "3/1",
    }, {
      text: "Für Mitarbeiter",
      icon: BadgeOutlinedIcon,
      id: "employees",
      xy: "3/2",
      active: xy == "3/2",
    }, {
      text: "Kontaktinfos",
      icon: ConnectWithoutContactOutlinedIcon,
      id: "contact",
      xy: "3/3",
      active: xy == "3/3",
    }, {
      text: "Stellenangebote",
      icon: PersonAddAltOutlinedIcon,
      id: "hiring",
      xy: "3/4",
      active: xy == "3/4",
    }, {
      text: "Das Team",
      icon: GroupsOutlinedIcon,
      id: "team",
      xy: "3/5",
      active: xy == "3/5",
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

        <SwipeXYHorizontal>
          <SwipeXYElement onc={"0000"}>
            <Stack sx={{
              minHeight: "100vh",
              width: "100vw",
              background: "linear-gradient(to bottom, #eecda3, #ef629f)",
            }}>
              _horizontal_1
              <Box onClick={() => {
                setXY("1/0");
              }} sx={{
                mt: 55,
                mx: "auto",
                bgcolor: "white",
                py: 2,
                width: 150,
                textAlign: "center"

              }}>
                <Typography>
                  zur nächsten slide
                </Typography>
              </Box>
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement onc={"0000"}>
            <Stack sx={{
              minHeight: "100vh",
              width: "100vw",
              background: "linear-gradient(to bottom, #eecda3, #ef629f)",
            }}>
              _horizontal_3
              <Box onClick={() => {
                setXY("2/0");
              }} sx={{
                mt: 55,
                mx: "auto",
                bgcolor: "white",
                py: 2,
                width: 150,
                textAlign: "center"

              }}>
                <Typography>
                  zur nächsten slide
                </Typography>
              </Box>
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement onc={"0000"}>
            <Stack sx={{
              minHeight: "100vh",
              width: "100vw",
              background: "linear-gradient(to bottom, #eecda3, #ef629f)",
            }}>
              _horizontal_3
              <Box onClick={() => {
                setXY("3/0");
              }} sx={{
                mt: 55,
                mx: "auto",
                bgcolor: "white",
                py: 2,
                width: 150,
                textAlign: "center"

              }}>
                <Typography>
                  zur nächsten slide
                </Typography>
              </Box>
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement onc={"0110"} startX={true}>
            <Stack sx={{
              minHeight: "100%",
              width: "100%",
              background: "linear-gradient(to bottom, #eecda3, #ef629f)",
            }}>
              _horizontal_4
            </Stack>
          </SwipeXYElement>
          <SwipeXYElement>
            <Stack sx={{
              minHeight: "100vh",
              width: "100vw",
            }}>
              _horizontal_5
            </Stack>
          </SwipeXYElement>
        </SwipeXYHorizontal>

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
