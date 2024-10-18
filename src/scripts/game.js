const suits = ['coppe', 'spade', 'oro', 'bastoni'];
const values = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '10'];
const points = ['11', '0', '10', '0', '0', '0', '0', '2', '3', '4'];
let cheat = false;

let deck = [];  
let adversary_hand = [];
let player_hand = [];
let briscola = null; // Briscola null, sarà assegnata appena un giocatore dichiara
let adversary_played_card = []; // Carta giocata dall'avversario
let player_played_card = []; // Carta giocata dal giocatore
let player_won_cards = []; // Carte vinte dal giocatore
let adversary_won_cards = []; // Carte vinte dall'avversario
let isPlayerTurn = true;  // Flag per controllare se il giocatore ha giocato una carta
let isEventListenerAdded = false; // Flag per controllare se l'event listener del click è stato aggiunto


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
    adversary_played_card= [];
    player_played_card = [];
    player_won_cards = [];
    adversary_won_cards = [];
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

    if (player_played_card.length > 0) {
        playedCardsContainer.innerHTML += `
            <div class="played-card-pos-player">
                <img src="images/carte/${player_played_card[0].suit}${player_played_card[0].value}.bmp" alt="${player_played_card[0].suit}${player_played_card[0].value}">
            </div>
        `;
    }

    if (adversary_played_card.length > 0) {
        playedCardsContainer.innerHTML += `
            <div class="played-card-pos-adversary">
                <img src="images/carte/${adversary_played_card[0].suit}${adversary_played_card[0].value}.bmp" alt="${adversary_played_card[0].suit}${adversary_played_card[0].value}">
            </div>
        `;
    }

}
// Funzione che gestisce il turno di gioco
function turn(){
    // Se il turno è del giocatore
    if(isPlayerTurn){
        playerTurn();
    } else {
        setTimeout(adversaryTurn, 500); // Ritardo per simulare il pensiero dell'avversario
    }
    setTimeout(determineWinner, 1000); // Determina il vincitore della mano con un timeout di 1000ms
}

// Funzione che gestisce il turno del giocatore
function playerTurn(){
    // Aggiungo un event listener per il click su ogni carta del giocatore
    if(!isEventListenerAdded){
        document.querySelector('.player-cards-container').addEventListener('click', function(event){
            // Controlla se l'elemento cliccato è l'immagine di una carta nella mano del giocatore
            if(event.target.tagName === 'IMG' && isPlayerTurn && !event.target.classList.contains('disabled')){
                // Ottengo la posizione della carta cliccata
                let cardPosition = event.target.parentElement.className.split('-')[3];
                // Converto la posizione della carta da carattere a numero
                cardPosition = parseInt(cardPosition);
                // Aggiungo la carta cliccata all'array delle carte giocate
                player_played_card.push(player_hand[cardPosition]);
                // Rimuovo la carta dalla mano del giocatore
                player_hand.splice(cardPosition, 1);
                // Aggiorno la grafica
                renderCards();
                // Disabilito le carte del giocatore
                document.querySelectorAll('.player-cards-container img').forEach(card => {
                    card.classList.add('disabled');
                });
                isPlayerTurn = false; // E' finito il turno del giocatore
                turn(); 
            }
        });
        isEventListenerAdded = true; // L'event listener è stato aggiunto
    }
}

// Funzione che gestisce il turno dell'avversario
function adversaryTurn(){
    if(adversary_hand.length > 0 && !isPlayerTurn){
        // Scegli una carta casuale dalla mano dell'avversario
        let cardPosition = Math.floor(Math.random() * adversary_hand.length);
        // Aggiungi la carta giocata all'array delle carte giocate
        adversary_played_card.push(adversary_hand[cardPosition]);
        // Rimuovi la carta dalla mano dell'avversario
        adversary_hand.splice(cardPosition, 1);
        // Aggiorna la grafica
        renderCards();
        // L'avversario ha giocato una carta
        isPlayerTurn = true;
        turn();
    }
}

// Determina il vincitore della mano
function determineWinner(){
    let playerCard = player_played_card[0];
    let adversaryCard = adversary_played_card[0];
    let playerCardValue = points[values.indexOf(playerCard.value)];
    let adversaryCardValue = points[values.indexOf(adversaryCard.value)];

    // Se le carte hanno lo stesso seme
    if(playerCard.suit === adversaryCard.suit){
        if(playerCardValue > adversaryCardValue){
            console.log(`Player wins with ${playerCardValue} vs ${adversaryCardValue}`);
            player_won_cards.push(playerCard, adversaryCard);
        } else {
            console.log(`Adversary wins with ${adversaryCardValue} vs ${playerCardValue}`);
            adversary_won_cards.push(playerCard, adversaryCard);
        }
    } else {
        // Se le carte hanno semi diversi
        if(playerCard.suit === briscola){
            console.log(`Player wins with ${playerCardValue} vs ${adversaryCardValue}`);
            player_won_cards.push(playerCard, adversaryCard);
        } else if(adversaryCard.suit === briscola){
            console.log(`Adversary wins with ${adversaryCardValue} of ${adversaryCard.suit} vs ${playerCardValue}`); 
        } else {
            // Comanda il seme della prima carta tirata 
            console.log(`Player wins with ${playerCardValue} vs ${adversaryCardValue} `);
            player_won_cards.push(playerCard, adversaryCard);
        }
    }

    // Svuota le carte giocate per la prossima mano
    player_played_card = [];
    adversary_played_card = [];

    // Distribuisci una carta ciascuno se ci sono carte rimanenti nel mazzo
    if(deck.length > 0){
        if(player_hand.length < 5){
            player_hand.push(deck.pop());
        }
        if(adversary_hand.length < 5){
            adversary_hand.push(deck.pop());
        }
    }

    // Se il mazzo è vuoto e i giocatori non hanno più carte in mano, determina il vincitore del gioco
    if(deck.length === 0 && player_hand.length === 0 && adversary_hand.length === 0){
        determineGameWinner();
    }

    // Aggiorna la grafica
    renderCards();
}

function determineGameWinner(){
    let playerPoints = player_won_cards.reduce((sum, card) => sum + parseInt(points[values.indexOf(card.value)]), 0);
    let adversaryPoints = adversary_won_cards.reduce((sum, card) => sum + parseInt(points[values.indexOf(card.value)]), 0);

    if(playerPoints > adversaryPoints){
        console.log(`Player wins the game with ${playerPoints} points. Adversary has ${adversaryPoints} points.`);
    } else if(adversaryPoints > playerPoints){
        console.log(`Adversary wins the game with ${adversaryPoints} points. Player has ${playerPoints} points.`);
    } else {
        console.log(`The game is a draw with ${playerPoints} points each.`);
    }
}