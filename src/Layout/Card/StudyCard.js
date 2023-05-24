import React from "react";
import { Button } from "@mui/material";

export default function StudyCard({card, isFlipped, flipHandler, nextCardHandler}) {
    return (
        <div>
            <p>
            {isFlipped ? card.back : card.front}
            </p>
            <Button variant="contained" style={{backgroundColor: "gray"}} onClick={flipHandler}>Flip</Button>
            {isFlipped && <Button variant="contained" onClick={nextCardHandler}>Next</Button>}
        </div>
    )
}