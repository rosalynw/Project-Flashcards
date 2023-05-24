import { Delete, Draw } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { deleteCard } from "../../utils/api";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";

function Card({card}) {
    //return individual cards
    //display card
    //use readcard
    //edit to take to edit page
    const cardId = useParams();
    console.log(card);
    const id = card.id;
    const {url} = useRouteMatch();
    const handleDelete = (id) => {
        const result = window.confirm("Delete this card? \n You will not be able to recover it.");
        deleteCard(id)
    }

    console.log(card.front)
    return (
        <div>
            <div className="row">
                <div className="col">
                    <p>{card.front}</p>
                </div>
                <div className="col">
                    <p>{card.back}</p>
                </div>
            </div>
           <Link to={`${url}/cards/${id}/edit`}><Button variant="contained"><Draw/>Edit</Button></Link>
           <Button variant="contained" style={{backgroundColor: "red"}} onClick={handleDelete}><Delete /></Button>
        </div>
    )
}

export default Card;