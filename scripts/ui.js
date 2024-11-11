class ui{
    constructor(myGame){
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cardWidth = 75;
        this.cardHeight = 120;
        this.game = myGame;
    }

    setShadows(){
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; 
        this.ctx.shadowBlur = 20;
        this.ctx.shadowOffsetX = 5;
        this.ctx.shadowOffsetY = 5;
    }

    resetShadows(){
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    }

    clearDeck(){
        this.ctx.clearRect(0,this.canvas.height/2 - this.cardHeight/2, this.cardWidth, this.cardHeight);
    }

    renderCards(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetX = 5;
        this.ctx.shadowOffsetY = 5;
    }

    drawHand(hand, yPosition, isPlayer) {
        this.ctx.clearRect(0, yPosition, this.canvas.width, this.cardHeight);
        for (let i = 0; i < hand.length; i++) {
            const card = hand[i];
            const img = new Image();
            img.src = isPlayer ? `../images/carte/${card.suit}${card.value}.bmp` : `../images/carte/dorso.bmp`;
            img.onload = () => {
                this.ctx.drawImage(img, 50 + i * (this.cardWidth + 5), yPosition, this.cardWidth, this.cardHeight);
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
        const img = new Image();
        img.src = `../images/carte/dorso.bmp`;
        img.onload = () => {
            this.ctx.drawImage(img, 0,this.canvas.height/2 - this.cardHeight/2, this.cardWidth, this.cardHeight);
        };
    }

    // disegna le carte sul tavolo
    drawPlayedCards(){
        this.ctx.clearRect(450,250, this.cardWidth, this.cardHeight );
        this.ctx.clearRect(350,250  , this.cardWidth , this.cardHeight);
         
        if(this.game.player.playedCard){
            const card = this.game.player.playedCard;
            const img = new Image();
            img.src = `../images/carte/${card.suit}${card.value}.bmp`;
            img.onload = () => {
                this.ctx.drawImage(img, 350, 250, this.cardWidth, this.cardHeight);
            };
        }

        if(this.game.adversary.playedCard){
            const card = this.game.adversary.playedCard;
            const img = new Image();
            img.src = `../images/carte/${card.suit}${card.value}.bmp`;
            img.onload = () => {
                this.ctx.drawImage(img, 450, 250, this.cardWidth, this.cardHeight);
            };
        }
    }
}