const suits = ['coppe', 'spade', 'oro', 'bastoni'];
const values = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '10'];
const points = ['11','0','10','0','0','0','0','2','3','4'];
let cheat = false;

let deck = [];  
let adversary_hand = [];
let player_hand = [];
let briscola = null; // Briscola null, sarà assegnata appena un giocatore dichiara
let played_card_a = []; // Carta giocata dall'avversario
let played_card_p = []; // Carta giocata dal giocatore


let isPlayerTurn = true;  // Flag per controllare se il giocatore ha giocato una carta

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM completamente caricato e analizzato");
    deck = createDeck();
    deck = shuffleDeck(deck);
    dealHands(deck);
    renderCards();
    turn();
});

function restartGame(){
    deck = createDeck();
    deck = shuffleDeck(deck);
    dealHands(deck);
    played_cards = [];
    renderCards();
}

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

    if (played_card_p.length > 0) {
        playedCardsContainer.innerHTML += `
            <div class="played-card-pos-player">
                <img src="images/carte/${played_card_p[0].suit}${played_card_p[0].value}.bmp" alt="${played_card_p[0].suit}${played_card_p[0].value}">
            </div>
        `;
    }

    if (played_card_a.length > 0) {
        playedCardsContainer.innerHTML += `
            <div class="played-card-pos-adversary">
                <img src="images/carte/${played_card_a[0].suit}${played_card_a[0].value}.bmp" alt="${played_card_a[0].suit}${played_card_a[0].value}">
            </div>
        `;
    }

}

function turn(){
    // Aggiungo un event listener per il click su ogni carta del giocatore
    document.querySelector('.player-cards-container').addEventListener('click', function(event){
        // Controlla se l'elemento cliccato è l'immagine di una carta nella mano del giocatore
        if(event.target.tagName === 'IMG' && isPlayerTurn){
            // Ottengo la posizione della carta cliccata
            let cardPosition = event.target.parentElement.className.split('-')[3];
            // Converto la posizione della carta da carattere a numero
            cardPosition = parseInt(cardPosition);
            // Aggiungo la carta cliccata all'array delle carte giocate
            played_card_p.push(player_hand[cardPosition]);
            // Rimuovo la carta dalla mano del giocatore
            player_hand.splice(cardPosition, 1);
            // Aggiorno la grafica
            renderCards();
            isPlayerTurn = false; // E' finito il turno del giocatore
            setTimeout(adversaryTurn, 500); // Ritardo per simulare il pensiero dell'avversario
        }
    } 
    );
}

function adversaryTurn(){
    if(adversary_hand.length > 0 && !isPlayerTurn){
        // Scegli una carta casuale dalla mano dell'avversario
        let cardPosition = Math.floor(Math.random() * adversary_hand.length);
        // Aggiungi la carta giocata all'array delle carte giocate
        played_card_a.push(adversary_hand[cardPosition]);
        // Rimuovi la carta dalla mano dell'avversario
        adversary_hand.splice(cardPosition, 1);
        // Aggiorna la grafica
        renderCards();
        setTimeout(determineWinner, 1000); // Determina il vincitore della mano con un timeout di 500ms
        // L'avversario ha giocato una carta
        isPlayerTurn = true;
    }
}
function determineWinner(){
    // Determina il vincitore della mano
    let playerCard = played_card_p[0];
    let adversaryCard = played_card_a[0];
    let playerCardValue = points.indexOf(playerCard.value);
    let adversaryCardValue = points.indexOf(adversaryCard.value);
    let playerCardSuit = suits.indexOf(playerCard.suit);
    let adversaryCardSuit = suits.indexOf(adversaryCard.suit);

    // Se le carte hanno lo stesso seme
    if(playerCard.suit === adversaryCard.suit){
        if(playerCardValue > adversaryCardValue){
            console.log('Player wins');
        } else {
            console.log('Adversary wins');
        }
    } else {
        // Se le carte hanno semi diversi
        if(playerCard.suit === briscola){
            console.log('Player wins');
        } else if(adversaryCard.suit === briscola){
            console.log('Adversary wins');
        } else {
            // Comanda il seme della prima carta tirata 
            console.log('Player wins');
        }
    }

    // Svuota le carte giocate per la prossima mano
    played_card_p = [];
    played_card_a = [];
    renderCards();
}