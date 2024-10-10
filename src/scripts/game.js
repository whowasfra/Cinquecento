const suits = ['coppe', 'spade', 'oro', 'bastoni'];
const values = ['1', '2', '3', '4', '5' , '6', '7', '8', '9', '10'];
const points = ['11','0','0','0','0','0','0','2','3','4'];

function createDeck(){
    let deck = [];
    for(let suit of suits){
        for (let value of values)
            deck.push({suit,value});
    }
}

let deck = createDeck();
console.log(deck);

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


