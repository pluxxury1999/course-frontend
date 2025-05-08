import { AccordionDetails, AccordionSummary, Accordion as MuiAccordion, Typography } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

interface AccordionProps {
    question: string;
    answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
    return (
        <MuiAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="body2">{answer}</Typography>
            </AccordionDetails>
        </MuiAccordion>
    );
};

export default Accordion;
