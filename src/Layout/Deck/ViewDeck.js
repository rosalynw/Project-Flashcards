import { Book, Draw, Home, Add, Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { Button } from "@mui/material";
import CardList from "../Card/CardList";

function ViewDeck() {
    //should use read deck to get deck data
    const [cards, setCards] =useState([]);
    const [deck, setDeck] = useState([]);
    const { deckId } = useParams();
    const {url} = useRouteMatch();


    useEffect (() => {
        const abortController = new AbortController();
        async function fetchDeck() {
            const fetchedDeck = await readDeck(deckId, abortController.signal);
            setDeck(fetchedDeck);
            setCards(fetchedDeck.cards)
        }
        fetchDeck();
        return() => abortController.abort();
    }, [deckId]);

    // to delete deck like on individual deck cards
    const deleteHandler = async() => {
        const response = window.confirm("You will not be able to recover it.")
    }
    return (
        <div>
            <nav><Link to="/"><Home />Home</Link> / {deck.name} </nav>
            <div>
                <h3>{deck.name}</h3>
                {/* deck name */}
                {/* deck description */}
                <p>{deck.description}</p>
                {/* edit button, study button, add cards, delete. major changes are edit and add cards */}
                <Link to={`${url}/edit`}><Button><Draw />Edit</Button></Link>
                <Link to={`${url}/study`}><Button><Book />Study</Button></Link>
                <Link to={`${url}cards/new`}><Button><Add />Add Cards</Button></Link>
                <Button onClick={deleteHandler}><Delete/></Button>
            </div>
            <div>
                <h2>Cards</h2>
                {/* display deck cards. call API */}
                <CardList cards={cards} />
            </div>
        </div>
    )
}

export default ViewDeck;