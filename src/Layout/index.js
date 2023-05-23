import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Cards/Home";
import {Switch, Route} from "react-router-dom"
import Study from "../Cards/Study";
import { listDecks } from "../utils/api";
import CreateDeck from "../Cards/CreateDeck";
import DeckList from "../Cards/DeckList";
import AddCard from "../Cards/AddCard"

function Layout() {
  const [decks, setDecks] = useState([]);

       useEffect(() => {
        async function fetchDecks() {
            try {
              const fetchedDecks  = await listDecks();
              setDecks(fetchedDecks);
              
            } catch (error) {
              console.error(error);
            }
          }
          fetchDecks();
    }, [])

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
        {/* TODO: Implement the screen starting here */}
        <Route exact path="/">
          <Home decks={decks} />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study decks={decks}/>
        </Route>
        <Route path="/decks/new">
          <CreateDeck decks={decks} />
        </Route>
        <Route path="/decks/:deckId">
          <DeckList decks={decks} />
        </Route>
        <Route>
          <AddCard />
        </Route>
        <Route >
          <NotFound />
        </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
