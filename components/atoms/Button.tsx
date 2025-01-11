import React from "react";
import { Stack, Box } from '@mui/material';

interface IButton {
    children?: React.ReactNode;
}

const Button: React.FunctionComponent<IButton> = ({ children, round }) => {

    return (
        <Stack sx={{
            cursor: "pointer",
            px: 1.1,
            py: 0.65,
            bgcolor: "#d2dae2",
            position: "relative",
        }}>

            {children}

        </Stack>
    )
}

export default Button;