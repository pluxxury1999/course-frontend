import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { FaqItem, fetchFaqs } from "../api/faq";
import React, { useEffect, useState } from "react";

import Accordion from "../components/Accordion";
import { AskQuestionDialog } from "../components/AskQuestionDialog";

const FAQPage: React.FC = () => {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFaqs()
            .then((data) => setFaqs(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    if (error)
        return (
            <Typography
                color="error"
                align="center"
                sx={{ mt: 4 }}>
                Error: {error}
            </Typography>
        );

    return (
        <Container
            maxWidth="md"
            sx={{ mt: 4 }}>
            <Typography
                variant="h4"
                gutterBottom>
                Поширені запитання
            </Typography>
            {faqs.map((faq) => (
                <Accordion
                    key={faq._id}
                    question={faq.question}
                    answer={faq.answer}
                />
            ))}
            <AskQuestionDialog />
        </Container>
    );
};

export default FAQPage;