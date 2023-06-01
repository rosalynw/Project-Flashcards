import React, { useEffect, useState } from "react";
import { readCard, readDeck, updateCard } from "../../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import CardForm from "./CardForm";

export default function EditCard() {
    //nav bar with home link / deck name / edit card "cardid"

    const initialFormState = {
        front: "",
        back: "",
    }
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({});
    const history = useHistory();

    useEffect(() => {
        async function fetchDeck() {
            try {const fetchedDeck = await readDeck(deckId);
            setDeck(fetchedDeck);
            } catch (error) {
                console.error(error);
            }
        }
        async function fetchCards() {
            try {
                const fetchedCards = await readCard(cardId);
                setCard(fetchedCards);
            } catch (error) {
                console.error(error);
            }
        }
        fetchDeck();
        fetchCards();
    }, [deckId, cardId])

    const changeHandler = ({target}) => {
        setCard({
            ...card,
        [target.name]: target.value,
        })

    }

    //use update api should send user to deck screen
    const submitHandler = async (event) => {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deckId}`)
    }
   

    return (
        <div>
            <nav>
                <Link to="/"><Home />Home</Link> / {deck.name} / Edit Card {cardId}
            </nav>
            <h3>Edit Card</h3>
            <CardForm card={card} changeHandler={changeHandler} />
            <Link to={`/decks/${deckId}`}><Button variant="contained" style={{backgroundColor: "gray"}}>Cancel</Button></Link>
            <Button variant="contained" onClick={submitHandler}>Submit</Button>
        </div>
    )
}