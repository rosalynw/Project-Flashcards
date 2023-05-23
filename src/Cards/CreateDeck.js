import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Route, Switch, Link, useParams } from "react-router-dom";
import "./CreateDeck.css";

function CreateDeck({decks}) {
    //needs handlesubmit
    const {deckId} = useParams();
    return (
        <div>
            <nav className="navigation">
                <Link to="/"><Home />Home</Link>/ Create Deck
            </nav>
            <h2 style={{fontFamily:"sans-serif"}}>Create Deck</h2>
            <form className="newDeck">
            <label className="createName">
                Name
                <input 
                type="text" 
                name="deckName" 
                id="deckName" 
                placeholder="Deck Name" />
            </label>
            <label className="createDescription">
                Description
                <textarea 
                name="description" 
                id="description" 
                placeholder="Brief description of the deck"
                />
            </label>
            </form>
            <Link to="/">
            <Button variant="contained" style={{backgroundColor: "grey"}}>Cancel</Button>
            </Link>
            <Link to="/decks/:deckId">
            <Button variant="contained">Submit</Button>
            </Link>
        </div>
    )
}

export default CreateDeck;