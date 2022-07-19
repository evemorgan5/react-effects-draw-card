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

  //console.log(deck);

  async function fetchCardUsingIdOnButtonClick() {
    const cardResult = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/?count=1`);
    const cardInfo = cardResult.data.cards[0];
    setCard( cardInfo.value, cardInfo.suit);
  }

  console.log()


  // get card using deck id by axios get request
  // changes cardname array



  return (
    <div className="App">
      <header className="App-header">
        <p>Deck of cards</p>
        <button>Get card</button>
      </header>
    </div>
  );
}

export default App;
