import React from "react";

interface ISwipeYFrame {
    name: string;
    children?: React.ReactNode;
    bg?: string;
}
const SwipeYFrame: React.FunctionComponent<ISwipeYFrame> = ({ name, children, bg }) => {
    return children;
}

export default SwipeYFrame;