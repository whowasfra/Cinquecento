class Game{
    constructor(){
        this.deck = new Deck();
        this.player = new Player();
        this.adversary = new Player();
        this.player.hand = [];
        this.adversary.hand = [];
        this.firstHand();
        this.briscola = null;
        this.briscolaDeclared = false;
        this.playerIsFirst = true;
        this.isPlayerTurn = true;
        this.addCardEventListeners();
        this.ui = new ui(this);
        this.ui.drawAdversaryHand();
        this.ui.drawPlayerHand();
        this.ui.drawDeck();
        this.turn();
        this.declaredSuits = [];
    }
    
    firstHand(){
        for(let i = 0; i < 5; i++){
            this.player.hand.push(this.deck.dealCard());
            this.adversary.hand.push(this.deck.dealCard());
        }
    }
    
    addCardEventListeners(){
        document.getElementById('gameCanvas').addEventListener('click', (event) => {
            const rect = this.ui.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // controlla se l'elemento cliccato è una carta del giocatore
            if(this.isPlayerTurn){
                for(let i = 0; i < this.player.hand.length; i++){
                    const cardX = 50 + i * (this.ui.cardWidth + 5);
                    const cardY = 400;

                    if(x > cardX && x < cardX + this.ui.cardWidth && y > cardY && y < cardY + this.ui.cardHeight){
                        this.player.playedCard = this.player.playCard(i);
                        this.ui.drawPlayedCards(this);
                        this.turn();
                        break;
                    }
                }
            }
        });
    }

    turn() {
        if (this.isPlayerTurn) {
            this.checkForDeclaration();
            if (this.adversary.playedCard === null && this.player.playedCard !== null) {
                this.isPlayerTurn = false;
                setTimeout(() => this.adversaryTurn(), 500);
            }
        } else {
            setTimeout(() => this.adversaryTurn(), 500);
        }

        if (this.player.playedCard !== null && this.adversary.playedCard !== null) {
            setTimeout(() => this.determineWinner(), 500);
        }
    }

    // Metodo per simulare il turno dell'avversario in modo automatico
    adversaryTurn() {
        this.checkForAdversaryDeclaration(); // Ensure adversary declares before playing a card

        let bestCardIndex = 0;
        let bestCardValue = -1;
        let lowestCardIndex = 0;
        let lowestCardValue = Infinity;
        let hasNineOrTen = false;

        for (let i = 0; i < this.adversary.hand.length; i++) {
            let card = this.adversary.hand[i];
            let cardValue = card.points;

            if (this.briscola && card.suit === this.briscola) {
                cardValue += 10;
            }

            if (this.player.playedCard) {
                if (card.suit === this.player.playedCard.suit) {
                    cardValue += 5;
                } else if (card.suit === this.briscola) {
                    cardValue += 3;
                }
            }

            if (card.value === '9' || card.value === '10') {
                hasNineOrTen = true;
            }

            if (cardValue > bestCardValue) {
                bestCardValue = cardValue;
                bestCardIndex = i;
            }

            if (cardValue < lowestCardValue) {
                lowestCardValue = cardValue;
                lowestCardIndex = i;
            }
        }

        if (this.player.playedCard) {
            let playerCard = this.player.playedCard;
            let canBeatPlayer = this.adversary.hand.some(card => card.suit === playerCard.suit && card.points > playerCard.points);

            if (!canBeatPlayer) {
                bestCardIndex = lowestCardIndex;
            }
        }

        if (hasNineOrTen) {
            bestCardIndex = lowestCardIndex;
        }

        this.adversary.playedCard = this.adversary.playCard(bestCardIndex);
        this.ui.drawPlayedCards();
        if (this.player.playedCard === null) {
            this.isPlayerTurn = true;
            this.turn();
        } else {
            setTimeout(() => this.determineWinner(), 500);
        }

        this.checkForAdversaryDeclaration();
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
                if (playerCard.points > adversaryCard.points) { // Se il giocatore ha giocato una carta che vale più punti vince
                    this.winsRound(playerCard, adversaryCard, 'player');
                }
                else { // Se l'avversario ha giocato una carta che vale più punti vince
                    this.winsRound(playerCard, adversaryCard, 'adversary');
                }
            }
        } else { // Se le carte hanno semi diversi
            if (playerCard.suit === this.briscola) {
                this.winsRound(playerCard, adversaryCard, 'player');
            } else if (adversaryCard.suit === this.briscola) {
                this.winsRound(playerCard, adversaryCard, 'adversary');
            } else {         // comanda il seme della prima carta giocata
                if (this.playerIsFirst) {
                    this.winsRound(playerCard, adversaryCard, 'player');
                }
                else {
                    this.winsRound(playerCard, adversaryCard, 'adversary');
                }
            }
        }
        this.player.playedCard = null;
        this.adversary.playedCard = null;
        this.ui.drawPlayedCards();

        // se le carte non sono finite distribuire una carta a ciascun giocatore
        if(this.deck.cards.length > 0){
            if(this.player.hand.length < 5){
                this.player.hand.push(this.deck.cards.pop());
            }
            if(this.adversary.hand.length < 5){
                this.adversary.hand.push(this.deck.cards.pop());
            }
        } else {
            this.ui.clearDeck();
            console.log('Carte finite');
        }

        this.ui.drawPlayerHand(this);
        this.ui.drawAdversaryHand(this);

        // se la partita è finita bisogna definire il vincitore
        if(this.deck.cards.length === 0 && this.player.hand.length === 0 && this.adversary.hand.length === 0 && this.player.playedCard === null && this.adversary.playedCard === null){
            this.determineGameWinner();
        }

        this.turn();
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
        let suitsCount = [];
        for (let card of this.player.hand) {
            if (!suitsCount[card.suit]) {
                suitsCount[card.suit] = [];
            }
            suitsCount[card.suit].push(card.value);
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

        if(declarationDiv.querySelector(`button`) === null){
            const declareFunction = this.declare.bind(this, suit); // necessario per definire il contesto
            declarationDiv.innerHTML += `
                <button class="declaration-button">Dichiara ${suit}</button>
            `;
            const button = declarationDiv.querySelector(`button`);
            button.onclick = declareFunction;
        }
    }
    
    hideDeclarationButton(suit){
        let declarationDiv = document.querySelector(`.declaration-${suit}`);
        declarationDiv.innerHTML = '';
    }

    // Metodo per dichiarare un seme
    declare(suit){
        if (!this.briscolaDeclared && !this.declaredSuits.includes(suit)) {
            this.briscola = suit;
            this.player.points += 40;
            this.briscolaDeclared = true;
            this.declaredSuits.push(suit);
        } else if (this.briscolaDeclared && !this.declaredSuits.includes(suit)) {
            this.player.points += 20;
            this.declaredSuits.push(suit);
        } else {
            console.log('Hai già dichiarato questo seme');
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
    
    // Metodo per salvare la partita 
    async saveGame() {
        const gameState = {
            deck: this.deck.cards,
            player: {
                hand: this.player.hand,
                wonCards: this.player.wonCards,
                points: this.player.points
            },
            adversary: {
                hand: this.adversary.hand,
                wonCards: this.adversary.wonCards,
                points: this.adversary.points
            },
            briscola: this.briscola,
            briscolaDeclared: this.briscolaDeclared,
            playerIsFirst: this.playerIsFirst,
            isPlayerTurn: this.isPlayerTurn
        };

        try {
            const response = await fetch('save_game.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameState)
            });

            if (!response.ok) {
                throw new Error('Failed to save game');
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error saving game:', error);
        }
    }

    async loadGame() {
        try {
            const response = await fetch('load_game.php');

            if (!response.ok) {
                throw new Error('Failed to load game');
            }

            const gameState = await response.json();

            if (gameState.status !== 'no_saved_game') {
                this.deck.cards = gameState.deck;
                this.player.hand = gameState.player.hand;
                this.player.wonCards = gameState.player.wonCards;
                this.player.points = gameState.player.points;
                this.adversary.hand = gameState.adversary.hand;
                this.adversary.wonCards = gameState.adversary.wonCards;
                this.adversary.points = gameState.adversary.points;
                this.briscola = gameState.briscola;
                this.briscolaDeclared = gameState.briscolaDeclared;
                this.playerIsFirst = gameState.playerIsFirst;
                this.isPlayerTurn = gameState.isPlayerTurn;
                this.ui.drawAdversaryHand();
                this.ui.drawPlayerHand();
                this.ui.drawDeck();
                this.turn();
                console.log('Game loaded');
            } else {
                console.log('No saved game found');
            }
        } catch (error) {
            console.error('Error loading game:', error);
        }
    }

    // Method to check if the adversary can declare
    checkForAdversaryDeclaration() {
        let suitsCount = [];
        for (let card of this.adversary.hand) {
            if (!suitsCount[card.suit]) {
                suitsCount[card.suit] = [];
            }
            suitsCount[card.suit].push(card.value);
        }

        for (let suit in suitsCount) {
            if (suitsCount[suit].includes('9') && suitsCount[suit].includes('10') && this.briscola !== suit) {
                this.adversaryDeclare(suit);
                break;
            }
        }
    }

    // Method for the adversary to declare a suit
    adversaryDeclare(suit) {
        if (!this.briscolaDeclared && !this.declaredSuits.includes(suit)) {
            this.briscola = suit;
            this.adversary.points += 40;
            this.briscolaDeclared = true;
            this.declaredSuits.push(suit);
        } else if (this.briscolaDeclared && !this.declaredSuits.includes(suit)) {
            this.adversary.points += 20;
            this.declaredSuits.push(suit);
        } else {
            console.log('L\'avversario ha già dichiarato questo seme');
        }
        console.log(`Adversary declared ${suit}`);
    }
}

function startGame(){
    const game = new Game();
    window.gameInstance = game;
}

function endGame(){
    window.gameInstance.ui.ctx.clearRect(0, 0, window.gameInstance.ui.canvas.width, window.gameInstance.ui.canvas.height);
    window.gameInstance = null;
}

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');
//     const game = new Game();
//     window.gameInstance = game;
// });
