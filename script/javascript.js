let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true;

window.onload = function () {
    buildDeck();
    shuffleCards();
    startGame();
}

function buildDeck() {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const types = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
    deck = [];
    
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++){
            deck.push(values[j] + "_" + types[i]);
        }
        //console.log(deck);
    }
}
function shuffleCards() {
    for (let i = 0; i < deck.length; i++ ) {
        let j = Math.floor(Math.random() * deck.length);
        let game = deck[i];
        deck[i] = deck[j];
        deck[j] = game;
    }
    //console.log(deck);
}
function startGame() {
    hidden = deck.pop();
    dealerSum += theValue(hidden);
    dealerAceCount += checkAce(hidden)
    
    //console.log(hidden);
    //console.log(dealerSum)
}
function theValue(card) {
    let data = card.split('_');
    let value = data[0];
    
    if (isNaN(value)) {
        if (value == 'A') {
            return 11;
        } else {
            return 10;
        }
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == 'A') {
        return 1;
    } else {
        return 0;
    }
}



