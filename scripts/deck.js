// Class representing a single card in the deck
class Card {
    constructor(suit, value, points) {
        this.suit = suit; // The suit of the card (e.g., 'coppe', 'spade')
        this.value = value; // The value of the card (e.g., '1', '2')
        this.points = points; // The points associated with the card
    }
}

// Class representing a deck of cards
class Deck {
    constructor() {
        this.suits = ['coppe', 'spade', 'oro', 'bastoni']; // Array of suits
        this.values = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '10']; // Array of values
        this.points = [11, 0, 10, 0, 0, 0, 0, 2, 3, 4]; // Array of points corresponding to values
        this.cards = this.createDeck(); // Initialize the deck of cards
    }

    // Method to create a deck of cards
    createDeck(){
        let deck = [];
        for (let suit of this.suits){
            for (let value of this.values){
                deck.push(new Card(suit, value, this.points[value-1])); // Create a new card and add it to the deck
            } 
        }
        return this.shuffleDeck(deck); // Shuffle the deck before returning it
    }

    // Method to shuffle the deck of cards
    shuffleDeck(deck){
        for(let i = deck.length-1; i> 0; i--){
            const j = Math.floor(Math.random() * (i+1)); // Generate a random index
            [deck[i], deck[j]] = [deck[j], deck[i]] ; // Swap the cards at indices i and j
        }
        return deck; 
    }

    // Method to deal a card from the deck
    dealCard(){
        return this.cards.pop(); // Remove and return the last card from the deck
    }
}