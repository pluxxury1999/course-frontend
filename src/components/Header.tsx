import { AppBar, Toolbar, Typography } from "@mui/material";

import React from "react";

const Header: React.FC = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography
                variant="h6"
                component="div">
                Довідкове бюро авіакаси
            </Typography>
        </Toolbar>
    </AppBar>
);

export default Header;