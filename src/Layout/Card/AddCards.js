import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";


export default function AddCards() {
    //link home/ deck name/ add Card
    // deck name / add card
    // probably need to access cards?
    // on click save card front and card back form are entered then form is reset

    const initialFormState = {
        front: "",
        back: ""
    }

    const {deckId} = useParams();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({...initialFormState});

    useEffect(() => {
        async function fetchDeck() {
            try{
                const fetchedDeck = await readDeck(deckId);
                setDeck(fetchedDeck);
            } catch (error) {
                console.error(error);
            }
        }fetchDeck();
    }, [deckId])

    //have onchange render for text area input?
    const handleChange = ({target}) => {
        setCard({
            ...card,
            [target.name]: target.value,
            deckId,
        })
    }
    console.log(card)

    //onsubmit ADD card to current deck then reset the the form to initial state
    //use createCard api function
    const submitHandler = async (event) => {
        event.preventDefault();
        await createCard(deckId, card);
        setCard(initialFormState);
        }
        
    
    //save button should submit form and reset
    //done button should return to deck screen

    return (
        <div>
            <nav>
                <Link to="/"><Home />Home</Link> / {deck.name} / Add Card
            </nav>
            <h3>{deck.name}: Add Card</h3>
            <form>
                <div>
                    <label>Front</label>
                    <textarea
                    id="front"
                    name="front"
                    placeholder="Front side of card"
                    value={card.front}
                    onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>Back</label>
                    <textarea
                    id="back"
                    name="back"
                    placeholder="Back side of card"
                    value={card.back}
                    onChange={handleChange}
                    ></textarea>
                </div>
                <Link to={`/decks/${deckId}/`}><Button variant="contained" style={{backgroundColor: "gray"}}>Done</Button></Link>
                <Button variant="contained" onClick={submitHandler}>Save</Button>
            </form>
        </div>
    )
}