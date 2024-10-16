const suits = ['coppe', 'spade', 'oro', 'bastoni'];
const values = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '10'];
const points = ['11','0','10','0','0','0','0','2','3','4'];
let cheat = false;

let deck = [];  
let adversary_hand = [];
let player_hand = [];
let played_cards = [];

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM completamente caricato e analizzato");
    deck = createDeck();
    deck = shuffleDeck(deck);
    dealHands(deck);
    renderCards();
    playCard();
});

function createDeck(){
    deck = [];
    for(let suit of suits){
        for (let value of values)
            deck.push({suit,value});
    }
    return deck;
}

function shuffleDeck(deck){
    for(let i = deck.length-1; i> 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [deck[i], deck[j]] = [deck[j], deck[i]] ;
    }
    return deck;
}



function dealHands(deck){
    adversary_hand = deck.splice(0,5);
    player_hand = deck.splice(0,5);
}

function renderCards(){
    let adversaryCards = document.querySelector('.adversary-cards-container');
    adversaryCards.innerHTML = '';
    for(let i = 0; i < adversary_hand.length; i++){
        adversaryCards.innerHTML += `
            <div class="adversary-card-pos-${i}">
                <img src="images/carte/${adversary_hand[i].suit}${adversary_hand[i].value}.bmp" alt="${adversary_hand[i].suit}${adversary_hand[i].value}">
            </div>
        `;
    }
    
    let playerCards = document.querySelector('.player-cards-container');
    playerCards.innerHTML = '';
    for(let i = 0; i < player_hand.length; i++){      
        playerCards.innerHTML += `
            <div class="player-card-pos-${i}">
                <img src="images/carte/${player_hand[i].suit}${player_hand[i].value}.bmp" alt="${player_hand[i].suit}${player_hand[i].value}">
            </div>
        `;
    }

    let playedCardsContainer = document.querySelector('.played-cards-container');
    playedCardsContainer.innerHTML = '';
    for(let i = 0; i < played_cards.length; i++){
        playedCardsContainer.innerHTML += `
            <div class="played-card-pos-${i}">
                <img src="images/carte/${played_cards[i].suit}${played_cards[i].value}.bmp" alt="${played_cards[i].suit}${played_cards[i].value}">
            </div>
        `;
    }

}

function playCard(){
    // Aggiungo un event listener per il click su ogni carta del giocatore
    document.querySelector('.player-cards-container').addEventListener('click', function(event){
        // Controlla se l'elemento cliccato è l'immagine di una carta nella mano del giocatore
        if(event.target.tagName === 'IMG'){
            // Ottengo la posizione della carta cliccata
            let cardPosition = event.target.parentElement.className.split('-')[3];
            // Converto la posizione della carta da carattere a numero
            cardPosition = parseInt(cardPosition);
            // Aggiungo la carta cliccata all'array delle carte giocate
            played_cards.push(player_hand[cardPosition]);
            // Rimuovo la carta dalla mano del giocatore
            player_hand.splice(cardPosition, 1);
            // Aggiorno la grafica
            renderCards();
        }
    } 
    );
}
