let card = document.getElementsByClassName('card');
let cards = [...card];
let firstCard = null
let secondCard = null;
let currentScore = 0;
let attempts = 0;
const startOverBtn = document.getElementById('startOverBtn');
let clearGuessTimeout = null;

document.getElementById("currentScore").innerHTML = 'Matches: ' + currentScore;
document.getElementById("attempts").innerHTML = 'Attempts: ' + attempts;

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', selectedCard)
}

// console.log('cards', cards)

function selectedCard(event) {
  if (clearGuessTimeout !== null) {
    clearTimeout(clearGuessTimeout);
    clearGuess();
  }
  if (event.currentTarget.classList.contains('selected')) {
    return
  }
  else {
    event.target.classList.toggle('selected');
    checkMatch(event);
  }
}

function checkMatch(cardGuess) {

  if (firstCard === null) {
    firstCard = cardGuess;
    firstCard.target.classList.toggle('green');
  }

  else if (secondCard === null) {
    secondCard = cardGuess;
    if (firstCard.target.attributes.type.value === secondCard.target.attributes.type.value ) {
      firstCard.target.classList.toggle('matched');
      secondCard.target.classList.toggle('green');
      secondCard.target.classList.toggle('matched');
      currentScore = currentScore + 1;
      attempts = attempts + 1;
      firstCard = null;
      secondCard = null;
      document.getElementById("currentScore").innerHTML = 'Matches: ' + currentScore;
      document.getElementById("attempts").innerHTML = 'Attempts: ' + attempts;
      if (currentScore === 10) {
        youWin();
      }
    }
    else {
      attempts = attempts + 1;
      document.getElementById("attempts").innerHTML = 'Attempts: ' + attempts;
      firstCard.target.classList.toggle('green')
      firstCard.target.classList.toggle('orange')
      firstCard.target.classList.remove('selected', 'green');
      secondCard.target.classList.toggle('orange');
      secondCard.target.classList.remove('selected', 'green');
      clearGuessTimeout = setTimeout(clearGuess, 1100);
    }
  }
}

function clearGuess() {
  clearGuessTimeout = null;
  firstCard.target.classList.remove('orange');
  secondCard.target.classList.remove('orange');
  firstCard = null;
  secondCard = null;
}

shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

clearClasses = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i].classList.remove('orange', 'green', 'selected');
  }
}

startGame = () => {
  firstCard = null
  secondCard = null;
  currentScore = 0;
  attempts = 0;
  clearClasses(cards);
  shuffle(cards);
  document.getElementById("currentScore").innerHTML = 'Matches: ' + currentScore;
  document.getElementById("attempts").innerHTML = 'Attempts: ' + attempts;
  var newCard;
  for (let i = 0; i < cards.length; i++) {
    newCard = cards[i];
    document.getElementById('cardDeck').appendChild(newCard);
  }
}

var modal = document.getElementById('winnerPop');
var modalContent = document.getElementById('winnerPopContent');
var modalClose = document.getElementById('close');
var playAgain = document.getElementById('playAgain');

function youWin() {
  modal.style.display="flex";
}

modalClose.onclick = function() {
  modal.style.display="none";
}

playAgain.onclick = function() {
  modal.style.display="none";
  startGame();
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

startOverBtn.onclick = function() {
  console.log('start over clicked')
  startGame();
}

startGame();

