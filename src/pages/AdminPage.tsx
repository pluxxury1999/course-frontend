import { Container, Typography } from "@mui/material";

import React from "react";

const AdminPage: React.FC = () => (
    <Container sx={{ py: 4 }}>
        <Typography
            variant="h4"
            gutterBottom>
            Адмін-панель
        </Typography>
        <Typography>Тут згодом буде інтерфейс адміністратора.</Typography>
    </Container>
);

export default AdminPage;