const suits = ['coppe', 'spade', 'oro', 'bastoni'];
const values = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '10'];
const points = ['11', '0', '10', '0', '0', '0', '0', '2', '3', '4'];

// let cheat = false;

let deck = [];  
let adversary_hand = [];
let player_hand = [];
let briscola = null; // Briscola null, sarà assegnata la prima volta che un giocatore dichiara
let adversary_played_card = null; // Carta giocata dall'avversario
let player_played_card = null; // Carta giocata dal giocatore
let player_won_cards = []; // Carte vinte dal giocatore
let adversary_won_cards = []; // Carte vinte dall'avversario
let isPlayerTurn = false;  // Flag per controllare se è il turno del giocatore
let isAdversaryTurn = false; //Flag per controllare se è il turno dell'avversario
let briscolaDeclared = true; // Flag per controllare se la briscola è stata dichiarata

let playerPoints = 0;
let adversaryPoints = 0;


document.addEventListener("DOMContentLoaded", function(){
    deck = createDeck();
    deck = shuffleDeck(deck);
    dealHands(deck);
    renderCards();
    addCardEventListeners();
    turn();
    console.log("DOM completamente caricato e analizzato");
});

function addCardEventListeners(){
    document.querySelector('.player-cards-container').addEventListener('click', function(event){
        // Controlla se l'elemento cliccato è l'immagine di una carta nella mano del giocatore e non è disabilitata al click
        if(event.target.tagName === 'IMG' && !event.target.className.includes('disabled')){
            // Ottengo la posizione della carta cliccata
            let cardPosition = event.target.parentElement.className.split('-')[3]; // player-card-pos-0 -> 0
            // Converto la posizione della carta da carattere a numero
            cardPosition = parseInt(cardPosition);
            // Aggiungo la carta cliccata all'array delle carte giocate
            player_played_card = player_hand[cardPosition];
            // Rimuovo la carta dalla mano del giocatore
            player_hand.splice(cardPosition, 1);
            // Disabilito le carte del giocatore
            disablePlayerCards();
            // Aggiorno la grafica
            renderCards();
            turn();
        }
    });
}

// function restartGame(){
//     deck = createDeck();
//     deck = shuffleDeck(deck);
//     dealHands(deck);
//     adversary_played_card= [];
//     player_played_card = [];
//     player_won_cards = [];
//     adversary_won_cards = [];
//     renderCards();
// }

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

    if (player_played_card !== null) {
        playedCardsContainer.innerHTML += `
            <div class="played-card-player">
                <img src="images/carte/${player_played_card.suit}${player_played_card.value}.bmp" alt="${player_played_card.suit}${player_played_card.value}">
            </div>
        `;
    }

    if (adversary_played_card !== null) {
        playedCardsContainer.innerHTML += `
            <div class="played-card-adversary">
                <img src="images/carte/${adversary_played_card.suit}${adversary_played_card.value}.bmp" alt="${adversary_played_card.suit}${adversary_played_card.value}">
            </div>
        `;
    }
    
}

//funzione per controllare se è possibile dichiarare
function checkForDeclaration(){
    let suitsCount = {};
    for(let card of player_hand){
        if(!suitsCount[card.suit]){
            suitsCount[card.suit] = [];
        }
        suitsCount[card.suit].push(card.value);
    }

    for(let suit in suitsCount){
        if(suitsCount[suit].includes('9') && suitsCount[suit].includes('10')){
            console.log(`Player can declare briscola ${suit}`);
            showDeclarationButton(suit);
        }
    }
    // Per ora non controlliamo se la dichiarazione è possibile per l'avversario
}

function showDeclarationButton(suit){
    let declarationDiv = document.querySelector(`.declaration-${suit}`);

    // Se il bottone non è già stato creato, lo crea
    if(document.querySelector(`.declaration-${suit} button`) === null){
        declarationDiv.innerHTML = `
            <button onclick="declareBriscola('${suit}')">Dichiara ${suit}</button>
        `;
    }
}

function declareBriscola(suit){
    if(!briscolaDeclared){
        briscola = suit;
        playerPoints += 40;
    }
    else{
        console.log('Briscola already declared');
        playerPoints += 20;
    }
    briscolaDeclared = true;
    console.log(`Player declared ${suit} as briscola`);

    // Nascondi il bottone di dichiarazione
    let choosenDeclaration = document.querySelector(`.declaration-${suit}`);
    choosenDeclaration.innerHTML = '';

}

// Funzione che gestisce il turno di gioco
function turn(){
    // Se il turno è del giocatore
    if(isPlayerTurn){
        checkForDeclaration();

        //abilita le carte del giocatore
        let playerCards = document.querySelectorAll('.player-cards-container img');
        playerCards.forEach(card => {
            card.classList.remove('disabled');
        });

        if(player_played_card !== null && adversary_played_card === null){
            isPlayerTurn = false;
            isAdversaryTurn = true;
            if(briscola === null){ // Se la briscola non è stata dichiarata, assegna il seme della carta giocata dal giocatore come briscola per il turno attuale
                briscola = player_played_card.suit;
            }
            turn(); // Ricorsione per far giocare l'avversario
        }
    }
    else if(isAdversaryTurn){
        setTimeout(adversaryTurn, 500); // Ritardo per simulare il pensiero dell'avversario
    }

    if(player_played_card !== null && adversary_played_card !== null){
        setTimeout(determineWinner, 500); 
    }

        // Se il mazzo è vuoto e i giocatori non hanno più carte in mano, determina il vincitore del gioco
    if(deck.length === 0 && player_hand.length === 0 && adversary_hand.length === 0){
        determineGameWinner();
    }
}

// Funzione per disabilitare le carte del giocatore
function disablePlayerCards(){
    let playerCards = document.querySelectorAll('.player-cards-container img');
    playerCards.forEach(card => {
        card.classList.add('disabled');
    });
}

// Funzione che gestisce il turno dell'avversario
function adversaryTurn(){
    // Scegli una carta casuale dalla mano dell'avversario
    let cardPosition = Math.floor(Math.random() * adversary_hand.length);
    // Aggiungi la carta giocata all'array delle carte giocate
    adversary_played_card = adversary_hand[cardPosition];
    // Rimuovi la carta dalla mano dell'avversario
    adversary_hand.splice(cardPosition, 1);
    // Aggiorna la grafica 
    renderCards();
    if(player_played_card === null){ // Se il giocatore non ha ancora giocato
        isAdversaryTurn = false;
        isPlayerTurn = true;
        if(briscola === null ){ // Se la briscola non è stata dichiarata, assegna il seme della carta giocata dall'avversario come briscola per il turno attuale
            briscola = adversary_played_card.suit;
        }
        turn();
    }
    if(player_played_card !== null){ // Se entrambi i giocatori hanno giocato trova il vincitore
        setTimeout(determineWinner, 500);
    }
}

// Determina il vincitore della mano
function determineWinner(){
    let playerCard = player_played_card;
    let adversaryCard = adversary_played_card;
    let playerCardPoints = points[playerCard.value - 1];
    let adversaryCardPoints = points[adversaryCard.value - 1];

    // Se le carte hanno lo stesso seme vanno confrontate
    if (playerCard.suit === adversaryCard.suit) {
        if (playerCardPoints === adversaryCardPoints) { // Se le carte hanno lo stesso punteggio (la maggior parte = 0 ) confronta i valori nominali
            if (playerCard.value > adversaryCard.value) { // Se il valore nominale della carta del giocatore è maggiore
                console.log(`Player wins with ${playerCard.value} of ${playerCard.suit} vs ${adversaryCard.value} of ${adversaryCard.suit} making ${playerCardPoints} + ${adversaryCardPoints}`);
                player_won_cards.push(playerCard, adversaryCard);
                isAdversaryTurn = false;
                isPlayerTurn = true;
            } else { // Se il valore nominale della carta dell'avversario è maggiore
                console.log(`Adversary wins with ${adversaryCard.value} of ${adversaryCard.suit} vs ${playerCard.value} of ${playerCard.suit} making ${adversaryCardPoints} + ${playerCardPoints}`);
                adversary_won_cards.push(playerCard, adversaryCard);
                isAdversaryTurn = true;
                isPlayerTurn = false;
            }
        } 
        else if (playerCardPoints > adversaryCardPoints) { // Se il giocatore ha giocato una carta che vale più punti vince
            console.log(`Player wins with ${playerCard.value} of ${playerCard.suit} vs ${adversaryCard.value} of ${adversaryCard.suit} making ${playerCardPoints} + ${adversaryCardPoints}`);
            player_won_cards.push(playerCard, adversaryCard);
            isAdversaryTurn = false;
            isPlayerTurn = true;
        }
        else { // Se l'avversario ha giocato una carta che vale più punti vince
            console.log(`Adversary wins with ${adversaryCard.value} of ${adversaryCard.suit} vs ${playerCard.value} of ${playerCard.suit} making ${adversaryCardPoints} + ${playerCardPoints}`);
            adversary_won_cards.push(playerCard, adversaryCard);
            isAdversaryTurn = true;
            isPlayerTurn = false;
        }
    } else { // Se le carte hanno semi diversi
        if(playerCard.suit === briscola ){
            console.log(`Player wins with ${playerCard.value} of ${playerCard.suit} vs ${adversaryCard.value} of ${adversaryCard.suit} making ${playerCardPoints} + ${adversaryCardPoints}`);
            player_won_cards.push(playerCard, adversaryCard);
            isAdversaryTurn = false;
            isPlayerTurn = true;
        } else if(adversaryCard.suit === briscola){
            console.log(`Adversary wins with ${adversaryCard.value} of ${adversaryCard.suit} vs ${playerCard.value} of ${playerCard.suit} making ${adversaryCardPoints} + ${playerCardPoints}`); 
            isAdversaryTurn = true;
            isPlayerTurn = false;
        } 

        // nascosto per il momento
        // else {
        //     // Comanda il seme della prima carta tirata 
        //     console.log(`Player wins with ${playerCardPoints} vs ${adversaryCardPoints} `);
        //     player_won_cards.push(playerCard, adversaryCard);
        //     isAdversaryTurn = false;
        //     isPlayerTurn = true;
        // }
    }

    // Svuota le carte giocate per la prossima mano
    player_played_card = null;
    adversary_played_card = null;

    if(!briscolaDeclared){
        briscola = null;
    }

    // Distribuisci una carta ciascuno se ci sono carte rimanenti nel mazzo
    if(deck.length > 0){
        if(player_hand.length < 5){
            player_hand.push(deck.pop());
        }
        if(adversary_hand.length < 5){
            adversary_hand.push(deck.pop());
        }
    }

    // Aggiorna la grafica
    renderCards();
    turn();
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
