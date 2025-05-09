// src/components/AnswerDialog.tsx

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { UserQuestion, updateUserQuestion } from "../api/userQuestions";

interface AnswerDialogProps {
    open: boolean;
    onClose: () => void;
    question: UserQuestion;
    onAnswered: () => void;
}

const AnswerDialog: React.FC<AnswerDialogProps> = ({ open, onClose, question, onAnswered }) => {
    const [answer, setAnswer] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            // Передаємо об’єкт з полем answer
            await updateUserQuestion(question._id, { answer });
            onAnswered();
            onClose();
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm">
            <DialogTitle>Відповісти на питання</DialogTitle>
            <DialogContent dividers>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}>
                    {question.name} | {question.email}
                </Typography>
                <Typography sx={{ mb: 2 }}>{question.question}</Typography>
                <TextField
                    label="Ваша відповідь"
                    fullWidth
                    multiline
                    minRows={4}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={saving}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={saving}>
                    Відмінити
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={saving || !answer.trim()}>
                    Зберегти
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnswerDialog;