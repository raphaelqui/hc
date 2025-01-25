'use client';

import React, { useState } from "react";
import { Stack, Typography, Box, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Button from "@/components/atoms/Button";
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { useTheme } from '@mui/material/styles';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import Flag from 'react-world-flags';
interface INav {
  option?: number;
  options: any;
}
const Nav: React.FunctionComponent<INav> = ({
  option = 1,
  options,
}) => {


  const langs = [
    {
      unicode: "\u{1F1E9}\u{1F1EA}",
      initials: "DE",
    },
    {
      unicode: "\u{1F1EC}\u{1F1E7}",
      initials: "ENG",
    },
    {
      unicode: "\u{1F1EE}\u{1F1F9}",
      initials: "IT",
    },
    {
      unicode: "\u{1F1EB}\u{1F1F7}",
      initials: "FR",
    },
    {
      unicode: "\u{1F1F9}\u{1F1F7}",
      initials: "TU",
    },
    {
      unicode: "\u{1F1F8}\u{1F1E6}",
      initials: "AR",
    },
    {
      unicode: "\u{1F1EA}\u{1F1F8}",
      initials: "SPA",
    },
    {
      unicode: "\u{1F1F5}\u{1F1F1}",
      initials: "POL",
    },
    {
      unicode: "\u{1F1F5}\u{1F1F9}",
      initials: "POR",
    }
  ];

  const [lang, setLang] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [sideMenu, setSideMenu] = useState(true);
  const theme = useTheme();

  return (
    <ClickAwayListener onClickAway={() => {
      if (sideMenu) {
        setSideMenu(false);
      }
    }}>
      <Stack sx={{
        position: "fixed",
        width: "100%",
        bgcolor: "white",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}>
        <Stack
          mx={2}
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          pt={0.5}
          pb={0.5}
        >
          <Stack>
            <Typography variant="h6">HC</Typography>
          </Stack>
          <Stack display={{ xs: "none", sm: "flex" }} direction={"row"} spacing={2} sx={{
            "& > p:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            }
          }}>
            {
              options.reduce((accu: JSX.Element[], elem: { text: string; href: string }, index: number) => {
                accu.push(
                  <Link key={`nav-option-${index + 1}`} href={"/#" + elem.href
                  } style={{ textDecoration: 'none', color: "black" }}>
                    <Typography sx={{
                      textDecoration: option == index ? "underline" : "none"
                    }}>{elem.text}</Typography>
                  </Link>
                );
                return accu;
              }, [])
            }


          </Stack>
          <Stack direction={"row"} spacing={0.75} alignItems={"center"}>
            <Stack direction={"row"} alignItems={"center"} sx={{
              position: "relative",
            }}>
              <ClickAwayListener onClickAway={() => {
                setExpanded(false);
              }}>
                <Accordion
                  onClick={() => {
                    setExpanded(!expanded);
                  }} expanded={expanded} disableGutters={false} sx={{
                    width: 50,
                    position: "absolute",
                    top: "-16px",
                    left: -55,
                    zIndex: 100,
                    minHeight: "0px !important",
                    '&.MuiPaper-root': {
                      borderRadius: "6px",
                      border: "2px solid rgba(1, 1, 1, 0.1)",
                      borderBottom: "3px solid rgba(1, 1, 1, 0.1)",
                      p: 0,
                      py: 0.55,
                      boxShadow: "none"
                    },
                    "& .MuiButtonBase-root": {
                      minHeight: "0px !important",
                      height: 20,
                      width: "min-content",
                      ml: 0.75,
                    }
                  }}>
                  <AccordionSummary

                    sx={{
                      p: 0,
                      m: 0,
                      minHeight: 0,
                      "& .Mui-expanded": {
                        m: 0,
                        minHeight: "0px !important"
                      },
                      "& .MuiAccordionSummary-content": {
                        m: 0
                      }
                    }}
                  >
                    <Stack direction={"row"} alignItems={"center"} >
                      <Typography variant="subtitle1">
                        {langs[lang].unicode}
                      </Typography>
                      <Typography pl={0.5} variant="body2">{langs[lang].initials}</Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      cursor: "pointer",
                      p: 0,
                      width: "100%",

                    }}>
                    {langs.map(({ unicode, initials }, index) => {
                      return (
                        <Stack
                          key={`accordion-option${index + 1}`}
                          onClick={() => {
                            setLang(index);
                          }}
                          sx={{
                            width: "100%",
                            my: 0.2,
                            "&:hover": {
                              bgcolor: "#f2f2f2"
                            }
                          }}>
                          <Stack direction={"row"} alignItems={"center"} sx={{
                            ml: 0.75,
                            width: "min-content",
                          }}>
                            <Typography variant="subtitle1">
                              {unicode}
                            </Typography>
                            <Typography pl={0.5} variant="body2">{initials}</Typography>
                          </Stack>
                        </Stack>);
                    })}
                  </AccordionDetails>
                </Accordion>
              </ClickAwayListener>
            </Stack>
            <Box sx={{
              position: "relative",
              left: -0.5,
              height: "20px",
              width: "1px",
              bgcolor: "#d2dae2",
            }} />

            <Button>
              <LocalPhoneSharpIcon sx={{
                color: "rgba(0,0,0,0.6)",
                fontSize: 17
              }} />
            </Button>
            <Button>
              <MailOutlineSharpIcon sx={{
                color: "rgba(0,0,0,0.6)",
                fontSize: 17
              }} />
            </Button>
            <Box onClick={() => {
              setSideMenu(!sideMenu);
            }} display={{ xs: "block", sm: "none" }}>
              <Button>
                <MenuSharpIcon sx={{
                  color: "rgba(0,0,0,0.6)",
                  fontSize: 17
                }} />
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Stack sx={{
          transition: "right 0.3s ease-in-out",
          position: "absolute",
          top: 41.5,
          right: sideMenu ? "0%" : "-100%",
          width: "230px",
          bgcolor: "white",
          height: "calc(100vh - 41.5px)",
        }}></Stack>
      </Stack >
    </ClickAwayListener>
  );
};
export default Nav;