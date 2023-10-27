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
    dealerAceCount += checkAce(hidden);
    while (dealerSum < 17) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = './images/' + card + '.png';
        dealerSum += theValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    //console.log(hidden);
    //console.log(dealerSum)
    for(let i = 0; i < 2; i++){
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = './images/' + card + '.png';
        yourSum += theValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    document.getElementById('hit').addEventListener("click", hit);
    document.getElementById('pass').addEventListener("click", pass);
}

function hit(){
    if(!canHit) {
        return;
    }
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = './images/' + card + '.png';
    yourSum += theValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
    
    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
    }
}

function pass() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    
    canHit = false;
    document.getElementById('hidden').src = "./images/" + hidden + '.png';
    
    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    } else if (dealerSum > 21) {
        message = "You Win!";
    } else if (yourSum == dealerSum) {
        message = "Tie!";
    } else if (yourSum > dealerSum) {
        message = "You Win!";
    } else if (yourSum < dealerSum) {
        message = "You Lose!";
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
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

function reduceAce(playerSum, playerAceCount) {
    while(playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}



