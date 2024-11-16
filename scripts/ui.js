(function() {
    class ui{
        constructor(myGame){
            this.canvas = document.getElementById('gameCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.cardWidth = 75;
            this.cardHeight = 120;
            this.game = myGame;
        }

        clearCanvas(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        clearDeck(){
            this.ctx.clearRect(0,this.canvas.height/2 - this.cardHeight/2, this.cardWidth, this.cardHeight);
        }

        setRoundedCorners(img) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
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
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return canvas;
        }

        drawHand(hand, yPosition, isPlayer) {
            this.ctx.clearRect(0, yPosition, this.canvas.width, this.cardHeight);
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

        drawPlayerHand() {
            this.drawHand(this.game.player.hand, 400, true);
        }

        drawAdversaryHand() {
            this.drawHand(this.game.adversary.hand, 50, false);
        }

        // disegna il mazzo
        drawDeck(){
            if (this.game.deck.cards.length === 0) {
                this.clearDeck();
                return;
            }
            const img = new Image();
            img.src = `../images/carte/dorso.bmp`;
            img.onload = () => {
                const roundedImg = this.setRoundedCorners(img);
                this.ctx.drawImage(roundedImg, 0,this.canvas.height/2 - this.cardHeight/2, this.cardWidth, this.cardHeight);
            };
        }

        // disegna le carte sul tavolo
        drawPlayedCards() {
            // Clear only the areas where the played cards are drawn
            this.ctx.clearRect(350, 250, this.cardWidth, this.cardHeight);
            this.ctx.clearRect(450, 250, this.cardWidth, this.cardHeight);

            if (this.game.player.playedCard) {
                const card = this.game.player.playedCard;
                const img = new Image();
                img.src = `../images/carte/${card.suit}${card.value}.bmp`;
                img.onload = () => {
                    const roundedImg = this.setRoundedCorners(img);
                    this.ctx.drawImage(roundedImg, 350, 250, this.cardWidth, this.cardHeight);
                };
            }

            if (this.game.adversary.playedCard) {
                const card = this.game.adversary.playedCard;
                const img = new Image();
                img.src = `../images/carte/${card.suit}${card.value}.bmp`;
                img.onload = () => {
                    const roundedImg = this.setRoundedCorners(img);
                    this.ctx.drawImage(roundedImg, 450, 250, this.cardWidth, this.cardHeight);
                };
            }
        }

        drawTakenCard(x, y) {
            const img = new Image();
            img.src = `../images/carte/dorso.bmp`;
            img.onload = () => {
                const roundedImg = this.setRoundedCorners(img);
                this.ctx.drawImage(roundedImg, x, y, this.cardWidth, this.cardHeight);
            };
        }

        updatePlayerPoints(points) {
            document.getElementById('playerPoints').innerText = `Punti Giocatore: ${points}`;
        }

        updateAdversaryPoints(points) {
            document.getElementById('adversaryPoints').innerText = `Punti Avversario: ${points}`;
        }

        updateMessage(message) {
            const messagePanel = document.getElementById('messagePanel');
            const newMessage = document.createElement('div');
            newMessage.className = 'message';
            newMessage.innerText = message;
            messagePanel.appendChild(newMessage);
            messagePanel.scrollTop = messagePanel.scrollHeight; 
        }

        clearMessages() {
            const messagePanel = document.getElementById('messagePanel');
            messagePanel.innerHTML = '';
        }
    }

    window.ui = ui;
})();