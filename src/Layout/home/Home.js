import React, { useEffect, useState } from "react";
import {listDecks} from "../../utils/api"
import {Link} from "react-router-dom"
import DeckList from "../Deck/DeckList";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

function Home() {
    //should have buttons and list of decks
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        async function fetchDecks(){
            const response = await listDecks();
            setDecks(response);
        }
        fetchDecks();
    }, [])

    return (
        <div>
            <Link to="/decks/new" ><Button variant="contained"><Add />Create Deck</Button></Link>
            <DeckList decks={decks} />
        </div>
    )
}

export default Home;