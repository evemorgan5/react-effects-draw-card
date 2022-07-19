import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';


const BASE_URL = "http://deckofcardsapi.com/api/deck/";


function App() {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);


  async function fetchDeck() {
    const deckResult = await axios.get(`${BASE_URL}new/`);
    setDeck(deckResult.data);
  }

  useEffect(function fetchCardWhenMounted() {
    fetchDeck();
  }, []);


  async function fetchCardUsingIdOnButtonClick() {
    const cardResult = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);
    const cardData = cardResult.data;
    setCard(c => {
      return {
        value: cardData.cards[0].value,
        suit: cardData.cards[0].suit
      };
    });
    setDeck(d => {
      return {
        ...deck,
        remaining: cardData.remaining
      };
    });
  }

  console.log();

  // get card using deck id by axios get request
  // changes cardname array
  return (
    <div className="App">
      <header className="App-header">
        <p>Deck of cards</p>

        {deck && deck.remaining === 50
          ? <b>Error: no cards remaining!</b>
          : <button onClick={fetchCardUsingIdOnButtonClick}>Get card</button>
        }
        {card &&
          <p>{card.value} OF {card.suit}</p>
        }
      </header>
    </div>
  );
}

export default App;
