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
        this.points = ['11', '0', '10', '0', '0', '0', '0', '2', '3', '4'];
        this.cards = this.createDeck();
        this.shuffleDeck();
    }

    createDeck(){
        let deck = [];
        for (let suit of this.suits){
            for (let value of this.values){
                for (let points of this.points){
                    deck.push(new Card(suit, value, points));
                } 
            }
        }
        return deck;
    }

    shuffleDeck(){
        for(let i = this.cards.length-1; i> 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]] ;
        }
    }

}

export default Deck;