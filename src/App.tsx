import { Box } from "@mui/material";
import FAQPage from "./pages/FAQPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React from "react";

const App: React.FC = () => (
    <>
        <Header />
        <Box
            component="main"
            sx={{ flex: 1 }}>
            <FAQPage />
        </Box>
        <Footer />
    </>
);

export default App;