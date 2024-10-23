import {Deck, Card} from './deck.js';
import Player from './player.js';

class Game{
    constructor(){
        this.deck = new Deck();
        this.player = new Player();
        this.adversary = new Player();
        this.briscola = null;
        this.playerIsFirst = true;
        this.isPlayerTurn = true;

        // this.canvas = document.getElementById('gameCanvas');
        // this.ctx = this.canvas.getContext('2d');
        this.addCardEventListeners();
        this.renderCards();
        this.turn();
    }

    addCardEventListeners(){
        document.querySelector('.player-cards-container').addEventListener('click', (event) => {
            // Controlla se l'elemento cliccato è l'immagine di una carta nella mano del giocatore e non è disabilitata al click
            if(this.player.playedCard === null && event.target.tagName === 'IMG' && this.isPlayerTurn){
                // Ottengo la posizione della carta cliccata
                let cardPosition = event.target.parentElement.className.split('-')[3]; // player-card-pos-0 -> 0
                // Converto la posizione della carta da carattere a numero
                cardPosition = parseInt(cardPosition);
                // Aggiungo la carta cliccata all'array delle carte giocate
                this.player.playedCard = this.player.hand[cardPosition];
                // Rimuovo la carta dalla mano del giocatore
                this.player.hand.splice(cardPosition, 1);
                // Aggiorno la grafica
                this.renderCards();
                // Passo il turno all'avversario
                this.turn();       
            }
        });
    }

    renderCards(){
        let deckContainer = document.querySelector('.deck-container');
        if (deck.length > 0) {
            deckContainer.innerHTML = `
            <div class="deck">
                <img src="images/carte/dorso.bmp" alt="dorso">
            </div>
            `;
        }
        else {
            deckContainer.innerHTML = '';
        }

        // Mostra le carte del giocatore
        let playerContainer = document.querySelector('.player-cards-container');
        playerContainer.innerHTML = '';
        for (let i = 0; i> this.player.hand.length; i++){
            playerContainer.innerHTML += `
            <div class="player-card-pos-${i}">
                <img src="images/carte/${this.player.hand[i].suit}-${this.player.hand[i].value}.bmp" alt="${this.player.hand[i].suit}-${this.player.hand[i].value}">
            </div>
            `;
        }

        // Mostra le carte dell'avversario
        let adversaryContainer = document.querySelector('.adversary-cards-container');
        adversaryContainer.innerHTML = '';
        for (let i = 0; i> this.adversary.hand.length; i++){
            adversaryContainer.innerHTML += `
            <div class="adversary-card-pos-${i}">
                <img src="images/carte/${this.adversary.hand[i].suit}-${this.adversary.hand[i].value}.bmp" alt="${this.adversary.hand[i].suit}-${this.adversary.hand[i].value}">
            </div>
            `;
        }

        // Mostra le carte sul tavolo
        let tableContainer = document.querySelector('.played-cards-container');
        if (this.player.playedCard !== null) {
            playedCardsContainer.innerHTML += `
                <div class="played-card-player">
                    <img src="images/carte/${this.player.playedCard.suit}${this.player.playedCard.value}.bmp" alt="${this.player.playedCard.suit}${this.player.playedCard.value}">
                </div>
            `;
        }
        
        if(this.adversary.playedCard !== null){
            playedCardsContainer.innerHTML += `
                <div class="played-card-adversary">
                    <img src="images/carte/${this.adversary.playedCard.suit}${this.adversary.playedCard.value}.bmp" alt="${this.adversary.playedCard.suit}${this.adversary.playedCard.value}">
                </div>
            `;
        }

    }

    turn() {
        // Se il turno è del giocatore
        if (this.isPlayerTurn) {
            this.checkForDeclaration();
            if (this.adversary.playedCard === null && this.player.playedCard !== null) {
                isPlayerTurn = false;
                setTimeout(() => this.adversaryTurn(), 500); // Ritardo per simulare il pensiero dell'avversario
            }
        }
        // Se il turno è dell'avversario
        else {
            setTimeout(() => this.adversaryTurn(), 500); // Ritardo per simulare il pensiero dell'avversario
        }

        if (this.player.playedCard !== null && this.adversary.playedCard !== null) {
            setTimeout(determineWinner, 500);
        }
    }

    adversaryTurn() {
        let cardPosition = Math.floor(Math.random() * this.adversary.hand.length);
        this.adversary.playedCard = this.adversary.hand[cardPosition];
        this.adversary.playCard(cardPosition);
        this.renderCards();
        if (this.player.playedCard === null) {
            this.isPlayerTurn = true;
            this.turn();
        } else {
            setTimeout(() => this.determineWinner(), 500);
        }
    }
    //Determina il vincitore del round
    determineWinner() {
        let playerCard = this.player.playedCard;
        let adversaryCard = this.adversary.playedCard;
        
        // Se le carte hanno lo stesso seme vanno confrontate
        if (playerCard.suit === adversaryCard.suit) {
            if (playerCard.points === adversaryCard.points) { // Se le carte hanno lo stesso punteggio (la maggior parte = 0 ) confronta i valori nominali
                if (playerCard.value > adversaryCard.value) { // Se il valore nominale della carta del giocatore è maggiore
                    this.winsRound(playerCard, adversaryCard, 'player');
                } else { // Se il valore nominale della carta dell'avversario è maggiore
                    this.winsRound(playerCard, adversaryCard, 'adversary');
                }
            }
            else {
                if (playerCardPoints > adversaryCardPoints) { // Se il giocatore ha giocato una carta che vale più punti vince
                    this.winsRound(playerCard, adversaryCard, 'player');
                }
                else { // Se l'avversario ha giocato una carta che vale più punti vince
                    this.winsRound(playerCard, adversaryCard, 'adversary');
                }
            }
        } else { // Se le carte hanno semi diversi
            if (playerCard.suit === briscola) {
                this.winsRound(playerCard, adversaryCard, 'player');
            } else if (adversaryCard.suit === briscola) {
                this.winsRound(playerCard, adversaryCard, 'adversary');
            } else {         // comanda il seme della prima carta giocata
                if (playerIsFirst) {
                    this.winsRound(playerCard, adversaryCard, 'player');
                }
                else {
                    this.winsRound(playerCard, adversaryCard, 'adversary');
                }
            }
        }
    }

    // Metodo per assegnare le carte vinte al vincitore del round
    winsRound(playerCard, adversaryCard, whoWon) {
        if (whoWon === 'player') {
            console.log(`Player wins with ${playerCard.value} of ${playerCard.suit} vs ${adversaryCard.value} of ${adversaryCard.suit} making ${playerCard.points} + ${adversaryCard.points}`);
            this.player.wonCards.push(playerCard, adversaryCard);
            this.isPlayerTurn = true;
            this.playerIsFirst = true;
        } else {
            console.log(`Adversary wins with ${adversaryCard.value} of ${adversaryCard.suit} vs ${playerCard.value} of ${playerCard.suit} making ${adversaryCard.points} + ${playerCard.points}`);
            this.adversary.wonCards.push(playerCard, adversaryCard);
            this.isPlayerTurn = false;
            this.playerIsFirst = false;
        }
    }

    // Metodo per controllare se il giocatore può dichiarare
    checkForDeclaration() {
        let suitsCount = {};
        for (let card of this.player.hand) {
            if (suitsCount[card.suit]) {
                suitsCount[card.suit] = [];
            }
            else{
                suitsCount[card.suit].push(card.value);
            }
        }

        for (let suit in suitsCount) {
            if (suitsCount[suit].includes('9') && suitsCount[suit].includes('10') && this.briscola !== suit) {
                this.showDeclarationButton(suit);
            }
            else{
                this.hideDeclarationButton(suit);
            }
        }

        // Da definire il fatto che anche l'avversario possa dichiarare
    }    

    // Metodo per mostrare il pulsante per dichiarare
    showDeclarationButton(suit){
        let declarationDiv = document.querySelector(`.declaration-${suit}`);

        if(declarationDiv === null){
            declarationDiv.innerHTML += `
                <button class="declaration-button" onclick="declare('${suit}')">Dichiara ${suit}</button>
            `;
        }
    }
    
    hideDeclarationButton(suit){
        let declarationDiv = document.querySelector(`.declaration-${suit}`);
        declarationDiv.innerHTML = '';
    }

    // Metodo per dichiarare un seme
    declare(suit){
        if(this.briscola === null){
            this.briscola = suit;
            // this.player.declared = true;
            // this.adversary.declared = true;
            this.player.points += 40;
        }
        else{
            console.log('Hai già dichiarato');
            this.player.points += 20;
        }

        console.log(`Hai dichiarato ${suit}`);

        this.hideDeclarationButton(suit);
    }

    // Metodo per determinare il vincitore della partita
    determineGameWinner(){
        this.player.points += this.player.wonCards.reduce((acc, card) => acc + card.points, 0);
        this.adversary.points += this.adversary.wonCards.reduce((acc, card) => acc + card.points, 0);

        if(this.player.points > this.adversary.points){
            console.log(`Player won with ${this.player.points} points. Adversary has ${this.adversary.points} points.`);
        } else if(this.player.points < this.adversary.points){
            console.log(`Adversary won with ${this.adversary.points} points. Player has ${this.player.points} points.`);
        } else {
            console.log(`It's a tie! Both players have ${this.player.points} points.`);
        }

    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    new Game();
});