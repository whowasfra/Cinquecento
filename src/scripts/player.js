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
        this.playedCard = this.hand.splice(index, 1)[0];
    }
    
}

export default Player;