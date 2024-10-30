class Card {
    constructor(suit, value, points) {
        this.suit = suit;
        this.value = value;
        this.points = points;
    }
}

class Deck {
    constructor() {
        this.suits = ['coppe', 'spade', 'oro', 'bastoni'];
        this.values = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '10'];
        this.points = [11, 0, 10, 0, 0, 0, 0, 2, 3, 4];
        this.cards = this.createDeck();
        
    }

    createDeck(){
        let deck = [];
        for (let suit of this.suits){
            for (let value of this.values){
                deck.push(new Card(suit, value, this.points[value-1]));
            } 
        }
        return this.shuffleDeck(deck);
    }

    shuffleDeck(deck){
        for(let i = deck.length-1; i> 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [deck[i], deck[j]] = [deck[j], deck[i]] ;
        }
        return deck; 
    }

    dealCard(){
        return this.cards.pop();
    }
}