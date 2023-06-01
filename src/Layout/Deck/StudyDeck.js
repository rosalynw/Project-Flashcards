import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import { Add, Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import StudyCard from "../Card/StudyCard";

export default function StudyDeck() {

    const {deckId } = useParams();
    const [cards, setCards] = useState([])
    const [deck, setDeck] = useState([]);
    const [numberOfCards, setnumberOfCards ] = useState (0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardPositon, setCardPosition] = useState(1);
    const [card, setCard] = useState(0);
    const history = useHistory();
    

    useEffect(() => {
        async function fetchDeck() {
       try { const fetchedDeck = await readDeck(deckId);
        setDeck(fetchedDeck);
        setCards(fetchedDeck.cards);
        setnumberOfCards(fetchedDeck.cards.length);
        setCard(fetchedDeck.cards[0])
        } catch (error) {
            console.log(error);
        }
    }
        fetchDeck();
    }, [deckId])

    //flip handler should render front or back of each card
    const flipHandler = () => {
        setIsFlipped(!isFlipped);
    }

    //const card = cards[cardPositon];
    console.log(cards);
    console.log(numberOfCards);
    console.log(card)
   
    
    //next change handler should move from one card array element to the next
    //basically a counter
    const nextCardHandler = () => {
        setIsFlipped(!isFlipped);
        //setCardPosition(cardPositon + 1);
        //console.log(cardPositon);
        if (cardPositon !== numberOfCards) {
            setCardPosition(cardPositon + 1)
            setCard(cards[cardPositon])
        } else {
            const restartDeck = window.confirm("Restart cards? \n Click 'cancel' to return to the home page");
            if (!restartDeck) {
                history.push("/")
            } else {
                //change card number
                setCardPosition(1);
                //change card rendered
                setCard(cards[0])
            }
        }
    }

    return (
        <div>
            {/* Home Link/ deck name/ study */}
            {/* study: deck name */}
            {/* cards front and back changer */}
            {/* flip button then next button after is flipped */}
            {/* must only show card front OR back AND counts through array of cards */}
            <nav>
                <Link to="/"><Home />Home</Link> / {deck.name} / Study
            </nav>
            <h2><span> Study </span>: <span>{deck.name}</span></h2>
            <div>
                {/* render each card as it's own component */}
                {/* pass button functionality */}
                {/* IF less than 2 cards  */}
                {/* route add button to add card component */}
                {numberOfCards <= 2 ? (
                    <div>
                        <h3>Not enough cards.</h3>
                        <p>You need at least 3 cards to study. There are {numberOfCards} cards in this deck.</p>
                        <Link to={`/decks/${deckId}/cards/new`}><Button variant="contained"><Add />Add Cards</Button></Link>
                    </div>
                ) : (
                <StudyCard card={card} isFlipped={isFlipped} flipHandler={flipHandler} nextCardHandler={nextCardHandler} cardPositon={cardPositon} numberOfCards={numberOfCards}/>
                )}
            </div>
        </div>
    )
}