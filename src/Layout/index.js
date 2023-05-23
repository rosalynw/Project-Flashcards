import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {Switch, Route} from "react-router-dom"
import Home from "./home/Home";


function Layout() {

  return (
    <>
      <Header />
      <div className="container">
      <Switch>
        {/* TODO: Implement the screen starting here */}
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/decks/:deckId/study">
          {/* <Study /> */}
        </Route>
        <Route path="/decks/new">
          {/* <CreateDeck /> */}
        </Route>
        <Route path="/decks/:deckId">
          {/* <DeckList /> */}
        </Route>
        <Route>
          {/* <AddCard /> */}
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
