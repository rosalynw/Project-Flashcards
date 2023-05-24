import React from "react";
import { Button } from "@mui/material";

export default function StudyCard({card, isFlipped, flipHandler, nextCardHandler , cardPositon, numberOfCards}) {
    return (
        <div>
            <h5>Card {cardPositon} of {numberOfCards} </h5>
            <p>
            {isFlipped ? card.back : card.front}
            </p>
            <Button variant="contained" style={{backgroundColor: "gray"}} onClick={flipHandler}>Flip</Button>
            {isFlipped && <Button variant="contained" onClick={nextCardHandler}>Next</Button>}
        </div>
    )
}