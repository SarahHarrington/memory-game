let card = document.getElementsByClassName('card');
let cards = [...card];

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', selectedCard)
}

console.log('cards', cards)

let eventTracker = [];

function selectedCard(event) {
  console.log('card clicked', event.target.attributes.type.value);
  eventTracker.push(event);
  console.log('event tracker', eventTracker)
  checkMatch(event);
}

let firstCard = null
let secondCard = null;

function checkMatch(cardGuess) {
  var trackingArray = [];

  if (firstCard === null) {
    firstCard = cardGuess;
    firstCard.target.classList.toggle('green');
    console.log('first card', firstCard)
  }
  else if (secondCard === null) {
    secondCard = cardGuess;
    console.log('second card', secondCard)
    if (firstCard.target.attributes.type.value === secondCard.target.attributes.type.value ) {
      console.log('cards match!')
      secondCard.target.classList.toggle('green');
      clearArray();
    }
    else {
      console.log('cards do not match')
      console.log('eventTracker class list', eventTracker[0].target.classList)
      eventTracker[0].target.classList.toggle('green', 'orange')
      eventTracker[1].target.classList.toggle('orange');
      firstCard = null;
      secondCard = null;
      setTimeout(clearGuess, 1000)
    }
  }
}

function clearArray() {
  trackingArray = [];
  firstCard = null;
  secondCard = null;
}

function clearGuess() {
  eventTracker[0].target.classList.remove('orange', 'green');
  eventTracker[1].target.classList.remove('orange', 'green')
  eventTracker = [];
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
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

startGame();

