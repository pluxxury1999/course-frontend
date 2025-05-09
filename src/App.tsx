// src/App.tsx

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminPage from "./pages/AdminPage";
import { Box } from "@mui/material";
import FAQPage from "./pages/FAQPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React from "react";

const App: React.FC = () => (
    <BrowserRouter>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />

            <Box
                component="main"
                sx={{ flex: 1 }}>
                <Routes>
                    {/* Автоматично редіректимо з кореня на /faq */}
                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/faq"
                                replace
                            />
                        }
                    />
                    <Route
                        path="/faq"
                        element={<FAQPage />}
                    />
                    <Route
                        path="/admin"
                        element={<AdminPage />}
                    />
                </Routes>
            </Box>

            <Footer />
        </Box>
    </BrowserRouter>
);

export default App;