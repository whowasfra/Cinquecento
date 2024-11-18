(function() {
    // Define the ui class
    class ui {
        // Constructor to initialize the canvas, context, card dimensions, and game instance
        constructor(myGame) {
            this.canvas = document.getElementById('gameCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.cardWidth = 75;
            this.cardHeight = 120;
            this.game = myGame;
        }

        // Method to clear the entire canvas
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Method to clear the deck area on the canvas
        clearDeck() {
            this.ctx.clearRect(0, this.canvas.height / 2 - this.cardHeight / 2, this.cardWidth, this.cardHeight);
        }

        // Method to set rounded corners for an image
        setRoundedCorners(img) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            // Define the path for rounded corners
            ctx.moveTo(10, 0);
            ctx.lineTo(canvas.width - 10, 0);
            ctx.quadraticCurveTo(canvas.width, 0, canvas.width, 10);
            ctx.lineTo(canvas.width, canvas.height - 10);
            ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - 10, canvas.height);
            ctx.lineTo(10, canvas.height);
            ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - 10);
            ctx.lineTo(0, 10);
            ctx.quadraticCurveTo(0, 0, 10, 0);
            ctx.closePath();
            ctx.clip();
            // Draw the image with rounded corners
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return canvas;
        }

        // Method to draw a hand of cards on the canvas
        drawHand(hand, yPosition, isPlayer) {
            this.ctx.clearRect(0, yPosition, this.canvas.width - 200, this.cardHeight);
            for (let i = 0; i < hand.length; i++) {
                const card = hand[i];
                const img = new Image();
                img.src = isPlayer ? `../images/carte/${card.suit}${card.value}.bmp` : `../images/carte/dorso.bmp`;
                img.onload = () => {
                    const roundedImg = this.setRoundedCorners(img);
                    this.ctx.drawImage(roundedImg, 50 + i * (this.cardWidth + 5), yPosition, this.cardWidth, this.cardHeight);
                };
            }
        }

        // Method to draw the player's hand
        drawPlayerHand() {
            this.drawHand(this.game.player.hand, 400, true);
        }

        // Method to draw the adversary's hand
        drawAdversaryHand() {
            this.drawHand(this.game.adversary.hand, 50, false);
        }

        // Method to draw the deck on the canvas
        drawDeck() {
            if (this.game.deck.cards.length === 0) {
                this.clearDeck();
                return;
            }
            const img = new Image();
            img.src = `../images/carte/dorso.bmp`;
            img.onload = () => {
                const roundedImg = this.setRoundedCorners(img);
                this.ctx.drawImage(roundedImg, 0, this.canvas.height / 2 - this.cardHeight / 2, this.cardWidth, this.cardHeight);
            };
        }

        // Method to draw the played cards on the table
        drawPlayedCards() {
            // Clear only the areas where the played cards are drawn
            this.ctx.clearRect(350, 225, this.cardWidth, this.cardHeight);
            this.ctx.clearRect(450, 225, this.cardWidth, this.cardHeight);
            
            if (this.game.player.playedCard) {
                const card = this.game.player.playedCard;
                const img = new Image();
                img.src = `../images/carte/${card.suit}${card.value}.bmp`;
                img.onload = () => {
                    const roundedImg = this.setRoundedCorners(img);
                    this.ctx.drawImage(roundedImg, 350, 225, this.cardWidth, this.cardHeight);
                };
            }

            if (this.game.adversary.playedCard) {
                const card = this.game.adversary.playedCard;
                const img = new Image();
                img.src = `../images/carte/${card.suit}${card.value}.bmp`;
                img.onload = () => {
                    const roundedImg = this.setRoundedCorners(img);
                    this.ctx.drawImage(roundedImg, 450, 225, this.cardWidth, this.cardHeight);
                };
            }
        }
     
        // Method to draw the taken card on the canvas
        drawTakenCard(isPlayer) {
            const img = new Image();
            img.src = `../images/carte/dorso.bmp`;
            let x = 0;
            let y = 0;
            if (isPlayer) {                                   
                x = this.canvas.width - 2 * this.cardWidth;
                y = this.canvas.height - this.cardHeight;
            } else {
                x = this.canvas.width - 2 * this.cardWidth;
                y = 0;
            }
            img.onload = () => {
                const roundedImg = this.setRoundedCorners(img);
                this.ctx.drawImage(roundedImg, x, y, this.cardWidth, this.cardHeight);
            };
        }

        // Method to update the player's points on the UI
        updatePlayerPoints(points) {
            document.getElementById('playerPoints').innerText = `Punti Giocatore: ${points}`;
        }

        // Method to update the adversary's points on the UI
        updateAdversaryPoints(points) {
            document.getElementById('adversaryPoints').innerText = `Punti Avversario: ${points}`;
        }

        // Method to update the message panel with a new message
        updateMessage(message) {
            const messagePanel = document.getElementById('messagePanel');
            const newMessage = document.createElement('div');
            newMessage.className = 'message';
            newMessage.innerText = message;
            messagePanel.appendChild(newMessage);
            messagePanel.scrollTop = messagePanel.scrollHeight;
            setTimeout(() => {
                newMessage.style.backgroundColor = 'white';
            }, 5000);
        }

        // Method to clear all messages from the message panel
        clearMessages() {
            const messagePanel = document.getElementById('messagePanel');
            messagePanel.innerHTML = '';
        }

        // Method to toggle the start game button's disabled state
        toggleStartButton() {
            document.getElementById('startGameButton').disabled = !document.getElementById('startGameButton').disabled;
        }

        // Method to toggle the end game button's disabled state
        toggleEndButton() {
            document.getElementById('endGameButton').disabled = !document.getElementById('startGameButton').disabled;
        }
    }

    // Expose the ui class to the global scope
    window.ui = ui;
})();