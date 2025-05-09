// src/App.tsx

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminPage from "./pages/AdminPage";
import { Box } from "@mui/material";
import FAQPage from "./pages/FAQPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";

const App: React.FC = () => (
    <BrowserRouter>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />

            <Box
                component="main"
                sx={{ flex: 1 }}>
                <Routes>
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
                        path="/login"
                        element={<LoginPage />}
                    />

                    {/* Всі роути всередині ProtectedRoute будуть доступні тільки якщо Auth */}
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/admin"
                            element={<AdminPage />}
                        />
                    </Route>

                    {/* За потреби 404 */}
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/faq"
                                replace
                            />
                        }
                    />
                </Routes>
            </Box>

            <Footer />
        </Box>
    </BrowserRouter>
);

export default App;