import React from "react";
import { Stack } from "@mui/material";
interface ISwipeXYElement {
    children?: any;
    startX?: boolean;
}
const SwipeXYElement: React.FunctionComponent<ISwipeXYElement> = ({ startX = false, children }) => {
    return <Stack sx={{
        minHeight: "100vh",
        minWidth: "100vw",
    }}>
        {children}
    </Stack>;
}
export default SwipeXYElement;