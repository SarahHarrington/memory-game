let card = document.getElementsByClassName('card');
let cards = [...card];

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', selectedCard)
}

console.log('cards', cards)

function selectedCard(event) {
  console.log('card clicked', event.target.attributes.type.value);
  event.target.classList.add('green');

  checkMatch(event);
}

let firstCard = null
let secondCard = null;
function checkMatch(cardGuess) {

  if (firstCard === null) {
    firstCard = cardGuess;
    console.log('first card', firstCard)
  }
  else if (secondCard === null) {
    secondCard = cardGuess;
    console.log('second card', secondCard)
    if (firstCard.target.attributes.type.value === secondCard.target.attributes.type.value ) {
      secondCard.classList.add('green');
    }
    else {
      console.log('cards do not match')
      firstCard.classList.remove('green');
      firstCard = null;
      secondCard = null;
    }
  }
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

console.log('Cards', cards);
