import React from "react";
import { useState } from "react";

export default function CreateCard({card, changeHandler, isFront, isBack}) {

    const [isFontSide, setIsFrontSide] = useState(true);

    const placeholderText = " side of card";
    //const placeholderText = card.front ? "Front side of card" : "Back side of card";
    
    return (
        <div>
            <form>
            <form className="cardEditForm">
                <div className="cardEditFront">
                    <label htmlFor="front">Front</label>
                    {/* card is prefilled with current card front and back text */}
                    <textarea
                    id="front"
                    name="front"
                    value={card.front}
                    placeholder={`${isFront}${placeholderText}`}
                    onChange={changeHandler}
                    ></textarea>
                </div>
                <div className="cardEditBack">
                    <label htmlFor="back">Back</label>
                    <textarea
                    id="back"
                    name="back"
                    value={card.back}
                    placeholder={`${isBack}${placeholderText}`}
                    onChange={changeHandler}
                    ></textarea>
                </div>
            </form>
            </form>
        </div>
    )
}