import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserQuestion, fetchUserQuestions } from "../api/userQuestions";

import AnswerDialog from "../components/AnswerDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AdminPage: React.FC = () => {
    const [questions, setQuestions] = useState<UserQuestion[]>([]);
    const [loading, setLoading] = useState(true);

    // Стан для діалогу відповіді
    const [selected, setSelected] = useState<UserQuestion | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const data = await fetchUserQuestions();
            setQuestions(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const unprocessed = questions.filter((q) => q.answer === "");
    const processed = questions.filter((q) => q.answer !== "");

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container
            maxWidth="md"
            sx={{ py: 4 }}>
            <Typography
                variant="h4"
                gutterBottom>
                Адмін-панель
            </Typography>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: "bold" }}>Неопрацьовані питання ({unprocessed.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {unprocessed.length === 0 && <Typography>Немає нових питань.</Typography>}
                    {unprocessed.map((q) => (
                        <Box
                            key={q._id}
                            sx={{
                                mb: 2,
                                p: 2,
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 1,
                            }}>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold", mb: 1 }}>
                                {q.name} | {q.email}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>{q.question}</Typography>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                    setSelected(q);
                                    setDialogOpen(true);
                                }}>
                                Відповісти
                            </Button>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: "bold" }}>Опрацьовані питання ({processed.length})</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {processed.length === 0 && <Typography>Поки немає відповідей.</Typography>}
                    {processed.map((q) => (
                        <Box
                            key={q._id}
                            sx={{
                                mb: 2,
                                p: 2,
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: 1,
                            }}>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold", mb: 1 }}>
                                {q.name} | {q.email}
                            </Typography>
                            <Typography sx={{ fontStyle: "italic", mb: 1 }}>{q.question}</Typography>
                            <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Відповідь:</Typography>
                            <Typography>{q.answer}</Typography>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>

            {selected && (
                <AnswerDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    question={selected}
                    onAnswered={() => {
                        setDialogOpen(false);
                        setSelected(null);
                        load(); // перезавантажити список
                    }}
                />
            )}
        </Container>
    );
};

export default AdminPage;