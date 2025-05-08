import { Box, Container, Typography } from "@mui/material";

import React from "react";

const Footer: React.FC = () => (
    <Box
        component="footer"
        sx={{ bgcolor: "background.paper", py: 2, mt: 4 }}>
        <Container maxWidth="md">
            <Typography
                variant="body2"
                color="text.secondary"
                align="center">
                © {new Date().getFullYear()} Довідкове бюро авіакаси. Всі права захищені.
            </Typography>
        </Container>
    </Box>
);

export default Footer;