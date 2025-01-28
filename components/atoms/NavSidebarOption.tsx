import React from "react";
import { Stack, Typography } from '@mui/material';

interface INavSidebarOptions {
    icon: any;
    text: string;
    active: boolean;
    onClick: () => void;
}

const NavSidebarOptions: React.FunctionComponent<INavSidebarOptions> = ({ icon, text, active, onClick }) => {
    // console.log(icon);
    // <HomeOutlinedIcon sx={{
    //     color: "rgba(0,0,0,0.75)",
    //     fontSize: 21,
    // }} />
    return (
        <Stack
            onClick={onClick}
            sx={{
                px: 1.5,
                cursor: "pointer",
            }}>
            <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{
                    height: "100%",
                    bgcolor: active ? "rgba(0,0,0,0.03)" : "none",
                    px: 2,
                    borderRadius: 1.5,
                }}>
                {React.createElement(icon, {
                    sx: {
                        color: active ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.35)",
                        fontSize: 21,
                    }
                }, null)}
                <Stack direction={"row"} py={0.65} sx={{
                    position: "relative",
                    pl: 1.75,
                }}>
                    <Typography sx={{
                        color: active ? "rgba(0,0,0,0.75)" : 'rgba(0,0,0,0.4)',
                        fontSize: '1.075rem',
                        fontFamily: 'open sans',
                        fontWeight: 400,
                    }}>
                        {text}
                    </Typography>
                </Stack>
            </Stack >
        </Stack>
    );
}

export default NavSidebarOptions;