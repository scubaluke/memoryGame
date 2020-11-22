const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //   hasFlippedCard = false;
  secondCard = this;
  // find if cards match
  checkForMatch();
}
function checkForMatch() {
  const isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
  isMatch ? disableCards() : unflipCards();
  if (checkWin()) {
    const winningMessage = document.querySelector('.winningMessage');
    // winningMessage.textContent = 'Congratulations, You win!';
    fadeIn(winningMessage);
  }
}
function checkWin() {
  return [...cards].every((card) => card.classList.contains('flip'));
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    const randomOrder = Math.floor(Math.random() * cards.length);
    card.style.order = randomOrder;
  });
})();

function fadeIn(element) {
  element.classList.add('show');
  console.log(element);
  setTimeout(() => {
    element.style.opacity = '1';
  }, 20);
}

function fadeOut(element) {
  element.style.opacity = '0';

  setTimeout(() => {
    element.classList.remove('show');
  }, 500);
}

cards.forEach((card) => card.addEventListener('click', flipCard));
