/** @format */
"use client";
import Snackbar from "@mui/material/Snackbar";
import React, { createContext, useState, useContext, useEffect } from "react";
import Slide, { SlideProps } from "@mui/material/Slide";

const SnackbarContext = createContext({});
export const useSnackbar = () => useContext(SnackbarContext);

interface ISnackbarContext {
  info: string;
}
interface ISnackbarProvider {
  children: React.ReactNode;
}
const SnackbarProvider: React.FunctionComponent<ISnackbarProvider> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [snackbarState, setSnackbarState] = useState<ISnackbarContext>({
    info: "",
  });

  useEffect(() => {
    if (snackbarState.info.length > 0 && !open) {
      setOpen(true);
    } else if (snackbarState.info.length > 0) {
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 300);
    }
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 2600);
    return () => clearTimeout(timeout);
  }, [snackbarState.info]);

  return (
    <SnackbarContext.Provider value={{ setSnackbarState }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={500}
        TransitionComponent={SlideTransition}
        message={snackbarState.info}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='up' />;
}
