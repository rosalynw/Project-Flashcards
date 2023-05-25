import React, { useEffect, useState } from "react";
import { readCard, readDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import { Button} from "@mui/material";
import { Home, Label } from "@mui/icons-material";

export default function EditDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);

    useEffect(() => {
        async function fetchDeck() {
            try{
                const fetchedDeck = await readDeck(deckId);
                setDeck(fetchedDeck);
            } catch (error) {
                console.error(error);
            }
        } fetchDeck()

    },[deckId])


    return (
        <div>
            <nav>
                <Link to="/"><Home />Home</Link> / {deck.name} / Edit Deck
            </nav>
            <h2>Edit Deck</h2>
            <form>
                <div>
                    {/* inputs are prefilled with deck data and can be updated */}
                    <label>Name</label>
                    <input
                    id="name"
                    name="name"
                    ></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                    id="description"
                    name="description"
                    >
                    </textarea>
                </div>
            </form>
            <Button variant="contained" style={{backgroundColor: "gray"}}>Cancel</Button>
            <Button variant="contained">Submit</Button>
        </div>
    )
}