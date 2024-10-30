class ui{
    constructor(myGame){
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cardWidth = 75;
        this.cardHeight = 120;
        this.game = myGame;
    }

    renderCards(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 5;
        this.ctx.shadowOffsetY = 5;

    }


    // disegna le carte del giocatore
    drawPlayerHand(){
        this.ctx.clearRect(0, 400, this.canvas.width, this.cardHeight);
        for(let i = 0; i < this.game.player.hand.length; i++){
            const card = this.game.player.hand[i];
            const img = new Image();
            img.src = `../images/carte/${card.suit}${card.value}.bmp`;
            img.onload = () => {
                this.ctx.drawImage(img, 50 + i * (this.cardWidth + 5 ), 400, this.cardWidth, this.cardHeight);
            };
        }
    }

    // disegna le carte dell'avversario
    drawAdversaryHand(){
        this.ctx.clearRect(0, 50, this.canvas.width, this.cardHeight);
        for(let i = 0; i < this.game.adversary.hand.length; i++){
            const card = this.game.adversary.hand[i];
            const img = new Image();
            img.src = `../images/carte/dorso.bmp`;
            img.onload = () => {
                this.ctx.drawImage(img, 50 + i * (this.cardWidth + 5 ), 50, this.cardWidth, this.cardHeight);
            };
        }
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