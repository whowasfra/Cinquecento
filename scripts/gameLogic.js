class Game{
    constructor(){
        this.deck = new Deck();
        this.player = new Player();
        this.adversary = new Player();
        this.addCardEventListeners();
        this.ui = new ui(this);
        this.totalPointsToWin = 500;
        this.startNewSet();
    }

    startNewSet() {
        this.ui.clearCanvas();
        this.deck = new Deck();
        this.player.hand = [];
        this.player.wonCards = [];
        this.adversary.hand = [];
        this.adversary.wonCards = [];
        this.firstHand();
        this.briscola = null;
        this.briscolaDeclared = false;
        this.playerIsFirst = true;
        this.isPlayerTurn = true;
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
            if (!this.isPlayerTurn) return; // Ensure it's the player's turn before proceeding

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
                        this.ui.drawPlayerHand(this); 
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
        this.checkForAdversaryDeclaration(); 

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
        this.ui.drawAdversaryHand(this); 
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
        this.ui.drawPlayerHand(this); // Update player hand
        this.ui.drawAdversaryHand(this); // Update adversary hand

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
        }

        this.ui.drawPlayerHand(this);
        this.ui.drawAdversaryHand(this);

        // se la partita è finita bisogna definire il vincitore
        if(this.deck.cards.length === 0 && this.player.hand.length === 0 && this.adversary.hand.length === 0 && this.player.playedCard === null && this.adversary.playedCard === null){
            this.determineSetWinner();
        }
        this.turn();
   }

    // Metodo per assegnare le carte vinte al vincitore del round
    winsRound(playerCard, adversaryCard, whoWon) {
        if (whoWon === 'player') {
            console.log(`Player wins with ${playerCard.value} of ${playerCard.suit} vs ${adversaryCard.value} of ${adversaryCard.suit} making ${playerCard.points} + ${adversaryCard.points}`);
            this.ui.updateMessage("Hai vinto la mano con " + playerCard.value + " " + playerCard.suit + " contro " + adversaryCard.value + " " + adversaryCard.suit);
            this.player.wonCards.push(playerCard, adversaryCard);
            this.ui.drawTakenCard(true);
            this.isPlayerTurn = true;
            this.playerIsFirst = true;  
        } else {
            console.log(`Adversary wins with ${adversaryCard.value} of ${adversaryCard.suit} vs ${playerCard.value} of ${playerCard.suit} making ${adversaryCard.points} + ${playerCard.points}`);
            this.ui.updateMessage("Avversario ha vinto la mano con " + adversaryCard.value + " " + adversaryCard.suit + " contro " + playerCard.value + " " + playerCard.suit  );
            this.adversary.wonCards.push(playerCard, adversaryCard);
            this.ui.drawTakenCard(false);
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
        this.ui.updateMessage("Hai dichiarato a " + suit );
    }

    // Metodo per determinare il vincitore della partita
    determineSetWinner(){
        this.player.points += this.player.wonCards.reduce((acc, card) => acc + card.points, 0);
        this.adversary.points += this.adversary.wonCards.reduce((acc, card) => acc + card.points, 0);

        if (this.player.points >= this.totalPointsToWin || this.adversary.points >= this.totalPointsToWin) {
            if (this.player.points > this.adversary.points) {
                console.log(`Player won the game with ${this.player.points} points. Adversary has ${this.adversary.points} points.`);
                this.ui.updateMessage("Hai vinto con " + this.player.points + "contro" + this.adversary.points);
                this.endGame(true);
            } else if (this.player.points < this.adversary.points) {
                console.log(`Adversary won the game with ${this.adversary.points} points. Player has ${this.player.points} points.`);
                this.ui.updateMessage("Ha vinto l'avversario con " + this.adversary.points + "contro" + this.player.points);
                this.endGame(false);
            } else {
                console.log(`It's a tie! Both players have ${this.player.points} points.`);
                this.ui.updateMessage("Pareggio siete entrambi a " + this.player.points);
                this.startNewSet();
            }
        } else {
            console.log(`End of set. Player has ${this.player.points} points. Adversary has ${this.adversary.points} points.`);
            this.ui.updateMessage("Fine del set, nessuno dei giocatori ha raggiunto il punteggio necessario per vincere");
            this.ui.clearMessages(); 
            this.startNewSet();
        }
        this.ui.updatePlayerPoints(this.player.points);
        this.ui.updateAdversaryPoints(this.adversary.points);
    }

    endGame(isPlayerWinner) {
        fetch('../php/update_game_stats.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isPlayerWinner: isPlayerWinner })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text(); // Get the raw response text
        })
        .then(text => {
            console.log('Game stats updated:', text);
            stopGame();
        })
        .catch((error) => {
            console.error('Error updating game stats:', error);
        });
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

        for (let suit of Object.keys(suitsCount)) {
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
            console.log('Avversario ha già dichiarato questo seme');
        }
        console.log(`Adversary declared ${suit}`);
        this.ui.updateMessage("L' avversario ha dichiarato a " + suit);
    }

    
}

function startGame() {
    if (window.gameInstance) {
        stopGame();
    }
    const game = new Game();
    window.gameInstance = game;
    game.ui.toggleStartButton();
    game.ui.toggleEndButton();
}

function stopGame() {
    if (window.gameInstance) {
        window.gameInstance.player.hand = [];
        window.gameInstance.adversary.hand = [];
        window.gameInstance.ui.clearCanvas();
        window.gameInstance.ui.clearMessages();
        window.gameInstance = null;
    }
    const uiInstance = new ui();
    uiInstance.toggleStartButton();
    uiInstance.toggleEndButton();
}
