import { Home } from "@mui/icons-material";
import React, {useState, useEffect} from "react";
import {Link, useParams, Route, useRouteMatch} from "react-router-dom";
import { readDeck } from "../utils/api";

function DeckList ({decks}) {
    
    const [cards, setCards] = useState([]);
    //const [deck , setDeck] = useState([])
     const params = useParams();
    const deckId = params.deckId
      const { url } = useRouteMatch();


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchCards() {
            try {
                const fetchedCards = await readDeck(deckId);
                setCards(fetchedCards);
                
                console.log(fetchedCards)
            } catch (error) {
                console.error(error);
            }
        }
        fetchCards();
        return () => {
            controller.abort();
        }
}, [deckId])

    const deck = decks.find((deck) => deck.id === Number(deckId))

    console.log({deckId});
    console.log(deck)
    
    return (
        <div>
            <nav>
                <Link to="/"><Home />Home</Link> / {deck ? deck.name : "Deck not found"}
            </nav>
            <Route path={url}>
            <h5>{deck ? deck.name : "Deck not found"}</h5>
            </Route>
        </div>
    )
}



export default DeckList;