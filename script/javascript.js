class CardGame {
    constructor() {
        this.dealerSum = 0;
        this.yourSum = 0;
        this.dealerAceCount = 0;
        this.yourAceCount = 0;
        this.hidden = null;
        this.deck = [];
        this.canHit = true;

    }
    
    buildDeck() {
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const types = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
        this.deck = [];
        
        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                this.deck.push(values[j] + "_" + types[i]);
            }
        }
    }
    
    shuffleCards() {
        for (let i = 0; i < this.deck.length; i++) {
            let j = Math.floor(Math.random() * this.deck.length);
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
    
    startGame() {
        this.buildDeck();
        this.shuffleCards();
        //this.updateScore();
        
        this.hidden = this.deck.pop();
        this.dealerSum += this.theValue(this.hidden);
        this.dealerAceCount += this.checkAce(this.hidden);
        
            while (this.dealerSum < 17) {
            let cardImg = document.createElement('img');
            let card = this.deck.pop();
            cardImg.src = './images/' + card + '.png';
            this.dealerSum += this.theValue(card);
            this.dealerAceCount += this.checkAce(card);
            document.getElementById("dealer-cards").append(cardImg);
        }
        
        for (let i = 0; i < 2; i++) {
            let cardImg = document.createElement('img');
            let card = this.deck.pop();
            cardImg.src = './images/' + card + '.png';
            this.yourSum += this.theValue(card);
            this.yourAceCount += this.checkAce(card);
            document.getElementById("your-cards").append(cardImg);
        }
        document.getElementById("score-button").innerText = this.lives;
        document.getElementById('hit').addEventListener("click", this.hit.bind(this));
        document.getElementById('pass').addEventListener("click", this.pass.bind(this));
        document.getElementById('next-round').addEventListener('click', () => {
            location.assign('gamescreen.html');
        });
    
    }

 
    hit() {
 
        if (!this.canHit) {
            return;
        }
        let cardImg = document.createElement('img');
        let card = this.deck.pop();
        cardImg.src = './images/' + card + '.png';
        this.yourSum += this.theValue(card);
        this.yourAceCount += this.checkAce(card);
        document.getElementById("your-cards").append(cardImg);

        if (this.reduceAce(this.yourSum, this.yourAceCount) > 21) {
            this.canHit = false;
        }
    }

    pass() {
        this.dealerSum = this.reduceAce(this.dealerSum, this.dealerAceCount);
        this.yourSum = this.reduceAce(this.yourSum, this.yourAceCount);

        this.canHit = false;
        document.getElementById('hidden').src = "./images/" + this.hidden + '.png';

        let message = "";
        if (this.yourSum > 21) {
            message = "You Lose!";
        } else if (this.dealerSum > 21) {
            message = "You Win!";
        } else if (this.yourSum === this.dealerSum) {
            message = "Tie!";
        } else if (this.yourSum > this.dealerSum) {
            message = "You Win!";
        } else if (this.yourSum < this.dealerSum) {
            message = "You Lose!";
        }
        
        document.getElementById("dealer-sum").innerText = this.dealerSum;
        document.getElementById("your-sum").innerText = this.yourSum;
        document.getElementById("results").innerText = message;

        const nextRound = document.getElementById('next-round');
        nextRound.style.display = 'block';
        
    }

    theValue(card) {
        let data = card.split('_');
        let value = data[0];

        if (isNaN(value)) {
            if (value === 'A') {
                return 11;
            } else {
                return 10;
            }
        }
        return parseInt(value);
    }

    checkAce(card) {
        if (card[0] === 'A') {
            return 1;
        } else {
            return 0;
        }
    }

    reduceAce(playerSum, playerAceCount) {
        while (playerSum > 21 && playerAceCount > 0) {
            playerSum -= 10;
            playerAceCount -= 1;
        }
        return playerSum;
    }
}


const game = new CardGame();
window.onload = function () {
    game.startGame();
};

