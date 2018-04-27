let card = document.getElementsByClassName('card');
let cards = [...card];

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', selectedCard)
}

// console.log('cards', cards)

function selectedCard(event) {
  console.log('card clicked', event.target.attributes.type.value);
  event.target.classList.toggle('selected');
  checkMatch(event);
}

let firstCard = null
let secondCard = null;

let currentScore = 0;
let attempts = 0;

document.getElementById("currentScore").innerHTML = 'Current Score: ' + currentScore;
document.getElementById("attempts").innerHTML = 'Total Attempts: ' + attempts;

function checkMatch(cardGuess) {

  if (firstCard === null) {
    firstCard = cardGuess;
    firstCard.target.classList.toggle('green');
  }

  else if (secondCard === null) {
    secondCard = cardGuess;
    if (firstCard.target.attributes.type.value === secondCard.target.attributes.type.value ) {
      console.log('cards match!')
      firstCard.target.classList.toggle('matched');
      secondCard.target.classList.toggle('green');
      secondCard.target.classList.toggle('matched');
      currentScore = currentScore + 1;
      attempts = attempts + 1;
      firstCard = null;
      secondCard = null;
      document.getElementById("currentScore").innerHTML = 'Score: ' + currentScore;
      document.getElementById("attempts").innerHTML = 'Total Attempts: ' + attempts;
      if (currentScore === 10) {
        youWin();
      }
    }
    else {
      console.log('cards do not match')
      attempts = attempts + 1;
      document.getElementById("attempts").innerHTML = 'Total Attempts: ' + attempts;
      firstCard.target.classList.toggle('green', 'orange')
      secondCard.target.classList.toggle('orange');
      setTimeout(clearGuess, 1100)
    }
  }
}

function clearArray() {
  trackingArray = [];
  firstCard = null;
  secondCard = null;
}

function clearGuess() {
  firstCard.target.classList.remove('orange', 'green', 'selected');
  secondCard.target.classList.remove('orange', 'green', 'selected');
  firstCard = null;
  secondCard = null;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function startGame() {
  shuffle(cards);
  var newCard;
  for (var i = 0; i < cards.length; i++) {
    newCard = cards[i];
    document.getElementById('cardDeck').appendChild(newCard);
  }
}

var modal = document.getElementById('winnerPop');
var modalContent = document.getElementById('winnerPopContent');
var span = document.getElementsByClassName('close');

function youWin() {
  console.log('game is over');
  modal.style.display="flex";
}

span.onClick = function() {
  modal.style.display="none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

startGame();

