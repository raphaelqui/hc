import React from "react";
import { Stack, Box } from '@mui/material';

interface IButton {
    children?: React.ReactNode;
}

const Button: React.FunctionComponent<IButton> = ({ children, round }) => {

    return (
        <Stack sx={{
            cursor: "pointer",
            px: 2,
            py: 0.75,
            border: "2px solid rgba(1, 1, 1, 0.1)",
            borderBottom: "3px solid rgba(1, 1, 1, 0.1)",
            position: "relative",
            borderRadius: "6px"
        }}>

            {children}

        </Stack>
    )
}

export default Button;