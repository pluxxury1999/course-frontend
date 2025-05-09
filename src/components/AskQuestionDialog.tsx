// src/components/AskQuestionDialog.tsx

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    SlideProps,
    TextField,
    Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import { UserQuestion, postUserQuestion } from "../api/userQuestions";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Transition = forwardRef(function Transition(props: SlideProps & { children: React.ReactElement }, ref: React.Ref<unknown>) {
    return (
        <Slide
            direction="up"
            ref={ref}
            {...props}
        />
    );
});

export const AskQuestionDialog: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<UserQuestion>({
        name: "",
        email: "",
        question: "",
        answer: "",
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    // Валідаційні стани
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [questionError, setQuestionError] = useState<string | null>(null);

    const handleOpen = () => {
        setOpen(true);
        setSent(false);
        // обнулити помилки
        setNameError(null);
        setEmailError(null);
        setQuestionError(null);
    };
    const handleClose = () => setOpen(false);

    const validateName = (value: string) => {
        if (!value) return "Ім’я обов’язкове";
        if (value.length > 30) return "Макс. довжина 30 символів";
        if (/\s/.test(value)) return "Ім’я повинно бути одним словом";
        return null;
    };

    const validateEmail = (value: string) => {
        // простий regex для email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return "Email обов’язковий";
        if (!re.test(value)) return "Невірний формат email";
        return null;
    };

    const validateQuestion = (value: string) => {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount < 5) return "Питання має містити щонайменше 5 слів";
        return null;
    };

    const handleChange = (field: keyof Omit<UserQuestion, "answer">) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setForm((prev) => ({ ...prev, [field]: val }));

        // робимо валідацію на лету
        if (field === "name") setNameError(validateName(val));
        if (field === "email") setEmailError(validateEmail(val));
        if (field === "question") setQuestionError(validateQuestion(val));
    };

    const canSubmit =
        !sending && !sent && !nameError && !emailError && !questionError && form.name !== "" && form.email !== "" && form.question !== "";

    const handleSubmit = async () => {
        setSending(true);
        try {
            await postUserQuestion(form);
            setSent(true);
            setTimeout(() => {
                setSending(false);
                setForm({ name: "", email: "", question: "", answer: "" });
                handleClose();
            }, 1500);
        } catch (err) {
            console.error(err);
            setSending(false);
        }
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                        "0%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.1)" },
                        "100%": { transform: "scale(1)" },
                    },
                }}
                color="primary">
                <HelpOutlineIcon fontSize="large" />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted>
                <DialogTitle>Задати питання</DialogTitle>
                <DialogContent sx={{ minWidth: 300, py: 2 }}>
                    {sending && !sent && (
                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    )}
                    {sent ? (
                        <Typography
                            align="center"
                            variant="h6"
                            color="success.main">
                            Надіслано!
                        </Typography>
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Ім'я"
                                fullWidth
                                disabled={sending}
                                value={form.name}
                                onChange={handleChange("name")}
                                error={!!nameError}
                                helperText={nameError}
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                disabled={sending}
                                value={form.email}
                                onChange={handleChange("email")}
                                error={!!emailError}
                                helperText={emailError}
                            />
                            <TextField
                                margin="dense"
                                label="Питання"
                                fullWidth
                                multiline
                                minRows={3}
                                disabled={sending}
                                value={form.question}
                                onChange={handleChange("question")}
                                error={!!questionError}
                                helperText={questionError}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    {!sent && (
                        <>
                            <Button
                                onClick={handleClose}
                                disabled={sending}>
                                Скасувати
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                disabled={!canSubmit}>
                                Надіслати
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};