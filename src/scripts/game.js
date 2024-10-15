const suits = ['coppe', 'spade', 'oro', 'bastoni'];
const values = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '10'];
const points = ['11','0','10','0','0','0','0','2','3','4'];

function startGame(){
    let deck = createDeck();
    deck = shuffleDeck(deck);
    dealHands(deck);
    renderCards();
}

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

let adversary_hand = [];
let player_hand = [];

function dealHands(deck){
    adversary_hand = deck.splice(0,5);
    player_hand = deck.splice(0,5);
}

function renderCards(){
    let playerCards = document.querySelector('.player-cards-container');
    playerCards.innerHTML = '';
    for(let i = 0; i < player_hand.length; i++){      
        playerCards.innerHTML += `
            <div class="player-card-pos-${i}">
                <img src="images/carte/${player_hand[i].suit}${player_hand[i].value}.bmp" alt="${player_hand[i].suit}${player_hand[i].value}">
            </div>
        `;
    }
}

console.log(adversary_hand);
console.log(player_hand);
document.addEventListener("DOMContentLoaded", startGame);


// <div class="adversary-cards-container">
//     <div class="adversary-card-pos-a">
//         <img src="images/carte/dorso.bmp" alt="dorso">
//     </div>
//     <div class="adversary-card-pos-b">
//         <img src="images/carte/dorso.bmp" alt="dorso">
//     </div>
//     <div class="adversary-card-pos-c">
//         <img src="images/carte/dorso.bmp" alt="dorso">
//     </div>
//     <div class="adversary-card-pos-d">
//         <img src="images/carte/dorso.bmp" alt="dorso">
//     </div>
//     <div class="adversary-card-pos-e">
//         <img src="images/carte/dorso.bmp" alt="dorso">
//     </div>
// </div>


