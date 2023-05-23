import React, { useState, useEffect } from "react";
import {Link, Switch, Route, useRouteMatch } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import Study from "./Study";
import View from "./View";

import { Button } from "@mui/material";
import { Add, Class, Delete, Visibility } from "@mui/icons-material";
import "./Home.css"



function Home({decks}) {
   
    const {url } = useRouteMatch;


    //should include create deck button to link to "create Deck" screen
    //Exisiting decks with deck name, # of cards
    //need study button: take user to Study screen
    //view button: take user to Deck screen
    //View,CreateDeck, and Study should probably be wrapped in Switch and Route
    //delete button
    //Maybe Study and View should be within decks component?
    
    //const decks = await listDecks()


    const handleDeleteDeck = async (deckId) => {
        const confirmed = window.confirm('Are you sure you want to delete this deck?');
        if (confirmed) {
          await deleteDeck(deckId);
          setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
        }
      };

    return (
        <div>
            <Link to="/decks/new">
                <Button className="createDeck" variant="contained" startIcon={<Add />}>Create Deck</Button>
            </Link>
            {decks.map((deck) => (
                <div key={deck.id} className="deck">
                    <div className="deckText">
                        <h3 className="deckName">{deck.name}</h3>
                        <p className="cardNumber">{deck.cards.length} cards</p>
                    </div>
                    <p className="deckDescription">{deck.description}</p>
                    <div className="deckButtons">
                        <Button className="viewDeck" variant="contained" startIcon={<Visibility />}>
                            View
                        </Button>
                        <Link to={`/decks/${deck.id}/study`}><Button className="studyDeck" variant="contained" startIcon={<Class />}>
                            Study
                        </Button>
                        </Link>
                        <Button className="delete" variant="contained" color="error" onClick={() => handleDeleteDeck(deck.id)}>
                            <Delete/>
                        </Button>
                    </div>
                </div>
            ))}
            
        
        </div>
    )
}

export default Home;