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
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Stack sx={{
      position: "fixed",
      width: "100%",
      // backdropFilter: "blur(10px)"
    }}>
      <Stack
        mx={4}
        alignItems={"center"}
        direction={"row"}
        justifyContent={"space-between"}
        pt={2}
        pb={2}
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


        <Stack direction={"row"} spacing={0.75} alignItems={"center"} sx={{

        }}>
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
                  top: "-10px",
                  borderRadius: 0,
                  left: -50,
                  minHeight: "0px !important",
                  '&.MuiPaper-root': {
                    borderRadius: 0,
                    p: 0,
                    boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.1)"
                  },
                  "& .MuiButtonBase-root": {
                    minHeight: "0px !important",
                    height: 20,
                    width: "min-content",
                    ml: 0.75
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
            height: "20px",
            width: "0.5px",
            bgcolor: "#d2dae2",
          }} />

          <Button>
            <LocalPhoneSharpIcon sx={{
              color: "#1e272e",
              fontSize: 17
            }} />
          </Button>


          <Button>
            <MailOutlineSharpIcon sx={{
              color: "#1e272e",
              fontSize: 17
            }} />
          </Button>

          <Box display={{ xs: "block", sm: "none" }}>
            <Button>
              <MenuSharpIcon sx={{
                color: "#1e272e",
                fontSize: 17
              }} />
            </Button>
          </Box>


        </Stack>

      </Stack>
    </Stack >
  );
};
export default Nav;