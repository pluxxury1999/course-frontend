import { AccordionDetails, AccordionSummary, Accordion as MuiAccordion, Typography, useTheme } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

interface AccordionProps {
    question: string;
    answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
    const theme = useTheme();
    return (
        <MuiAccordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ backgroundColor: theme.palette.action.hover }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                    variant="body1"
                    sx={{ pl: 2, pr: 2, textAlign: "justify" }}>
                    {answer}
                </Typography>
            </AccordionDetails>
        </MuiAccordion>
    );
};

export default Accordion;