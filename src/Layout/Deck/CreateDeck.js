import { Home } from "@mui/icons-material";
import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import { Button } from "@mui/base";

function CreateDeck() {
    //create buttons to handle submit
    //on submit reset input and text area
    //cancel should return to home screen

    const history = useHistory();
    const initialFormState = {
        name: "",
        description: "",
    };

    const [formData, setFormData ] = useState({...initialFormState});

    //updates by the value
    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newDeck = await createDeck(formData);
        history.push(`/decks/${newDeck.id}`)
    }

    console.log(formData);

    return (
        <div>
            <nav>
                <Link to="/"><Home/>Home</Link> / Create Deck
            </nav>
            <h2>Create Deck</h2>
            <form>
                <div>
                    <label htmlFor="name" className="formName">Name</label>
                        <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Deck Name"
                        value={formData.name}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                    id="description"
                    name="description"
                    placeholder="Brief desciption of the deck"
                    value={formData.description}
                    onChange={handleChange}
                    style={{height: "100px"}}
                    />
                </div>
            </form>
            <Link to="/"><Button>Cancel</Button></Link>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

export default CreateDeck;