const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let matches = 0;
let canFlip = true;
let firstCard= null;
let secondCard= null;
// TODO: Implement this function!
function handleCardClick(event) {
  if (!canFlip) return; 
  const card = event.target;
  if (card === firstCard) return;
  
  card.style.backgroundColor = card.classList[0]; 
  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    canFlip = false; 
    if (firstCard.className === secondCard.className) {
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = null;
      secondCard = null;
      canFlip = true; 
      matches++;
      alert('Match!');
      if (matches === COLORS.length / 2){
        alert ('YOU WIN!');
      }
    } else {
       setTimeout(() => {
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';
        firstCard = null;
        secondCard = null;
        canFlip = true; 
      }, 1000);
      // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
