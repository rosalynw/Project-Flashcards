import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Switch, Route} from "react-router-dom"
import Home from "./home/Home";
import CreateDeck from "./Deck/CreateDeck";
import ViewDeck from "./Deck/ViewDeck";
import EditCard from "./Card/EditCard";
import EditDeck from "./Deck/EditDeck";
import StudyDeck from "./Deck/StudyDeck";
import AddCards from "./Card/AddCards";


function Layout() {

  return (
    <>
      <Header />
      <div className="container">
      <Switch>
        {/* TODO: Implement the screen starting here */}
        <Route exact path="/">
          {/* Decks are nested within Home but create Deck is a */}
          <Home />
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyDeck /> 
        </Route>
        <Route path="/decks/new">
          <CreateDeck /> 
        </Route>
        {/* the "deck" screen is to load and individual deck and all it cards */}
        <Route exact path="/decks/:deckId">
          <ViewDeck />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCards />
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
