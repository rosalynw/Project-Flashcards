import React, { useEffect, useState } from "react";
import {Link, useParams, useHistory } from "react-router-dom";
import {readDeck } from "../utils/api";
import { Home, Add } from "@mui/icons-material";
import { Button } from "@mui/material";

function Study({decks}) {
    const [cards, setCards] = useState([]);
    //useState as index counter
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const { deckId } = useParams();
    const history = useHistory();
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchCards() {
        try {
            const fetchedCards = await readDeck(deckId, signal);
            setCards(fetchedCards.cards);
            console.log(fetchedCards)
        } catch (error) {
            console.error(error);
        }
    }
    fetchCards();

    return () => {
        controller.abort();
    }
    }, [deckId]);


    const deck = decks.find((deck) => deck.id === Number(deckId));

  
    const currentCard = cards[currentCardIndex];
    console.log(currentCard);
    const handleFlip = () => {
        //need to conditionally render the front or back of card up click
        setIsFlipped(!isFlipped);
        setShowNextButton(!showNextButton);
    }

    const handleNext = () => {
        if (currentCardIndex < cards.length - 1) {
          setCurrentCardIndex(currentCardIndex + 1);
          setIsFlipped(false);
          setShowNextButton(false);
        } else {
          const restart = window.confirm("Restart the deck?");
          if (restart) {
            setCurrentCardIndex(0);
            setIsFlipped(false);
            setShowNextButton(false);
          } else {
            history.push("/");
          }
        }
      };

      if (!deck) {

      }
    
    return (
        <div>
            <nav>
                <Link to="/" startIcon={<Home />}>Home</Link>/ {deck? deck.name : "Deck not Found"} / Study
            </nav>
            <h2>Study: {deck? deck.name : "Deck not Found"}</h2>
            {cards.length <= 2 ? (
                <div>
                    <h4>Not enough cards.</h4>
                    <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`}>
                        <Button variant="contained" startIcon={<Add />}>Add Cards</Button>
                    </Link>
                </div>
            ) : (
            currentCard && (
        <div className="card">
          <h5>Card {currentCardIndex + 1} of {cards.length}</h5>
          <p>{isFlipped ? currentCard.back : currentCard.front}</p>
          <div className="cardButtons">
            <Button onClick={handleFlip} className="flipButton" variant="contained">Flip</Button>
          {isFlipped && showNextButton && (
            <Button onClick={handleNext} className="nextButton" variant="contained">Next</Button>
          )}
          </div>
        </div>
            )
      )}
        </div>  
    )

}

export default Study;