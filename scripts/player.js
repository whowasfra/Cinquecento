class Player{
    constructor(){
        this.hand = [];
        this.wonCards = [];
        this.playedCard = null;
        this.declared = false;
        this.hand = [];
        this.points = 0;
    }

    playCard(index){
        let card = this.hand[index];
        this.hand.splice(index, 1);
        return card;
    }
    
}
