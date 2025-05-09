import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Простий мок: логіниться тільки 'admin' / 'admin'
        if (username === "admin" && password === "admin") {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/admin");
        } else {
            setError("Невірний логін або пароль");
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{ mt: 8 }}>
            <Typography
                variant="h5"
                align="center"
                gutterBottom>
                Вхід в адмін-панель
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Логін"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && (
                    <Typography
                        color="error"
                        variant="body2">
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained">
                    Увійти
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;