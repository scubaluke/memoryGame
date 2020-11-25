import { example, data } from './data.js';

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  console.log(this);
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
  const isMatch = firstCard.dataset.match === secondCard.dataset.match;
  isMatch ? disableCards() : unflipCards();
  if (checkWin()) {
    const winningMessage = document.querySelector('.winningMessage');
    // winningMessage.textContent = 'Congratulations, You win!';
    fadeIn(winningMessage);
  }
}
function checkWin() {
  console.log(
    [...genoratedCards].every((card) => card.classList.contains('flip'))
  );
  return [...genoratedCards].every((card) => card.classList.contains('flip'));
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

const winningMessageButton = document.querySelector('.winningMessage button');
winningMessageButton.addEventListener('mouseover', nextRoundBtnHovered);
winningMessageButton.addEventListener(
  'click',
  () => (location.href = './roundTwo.html')
);

winningMessageButton.addEventListener(
  'mouseout',
  () => (winningMessageButton.textContent = `Play Next Round!`)
);
winningMessageButton.addEventListener('mouseout', () =>
  winningMessageButton.classList.remove('hovered')
);

function nextRoundBtnHovered() {
  winningMessageButton.classList.add('hovered');
  winningMessageButton.textContent = `Play Next Round! >`;
}
// function nextRoundBtnMouseout() {

// }
/** **** EXAMPLE PAGE  *************** */

function generateCards() {
  const board = document.querySelector('.board');

  const cardHtml = [];

  data.forEach((item) => {
    cardHtml.push(`<div class="card" data-match="${item.match}">
    <p class="frontFace">${item.sentence}</p>
    <img class="backFace" src="./img/selcardback.jpeg" alt="">
    </div>
    <div class="card" data-match="${item.match}">
    <p class="frontFace">${item.word}</p>
    <img class="backFace" src="./img/selcardback.jpeg" alt="">
    </div>`);
  });

  const boardHtml = `<div class="board">
  ${cardHtml.join('')}
</div>`;
  board.innerHTML = boardHtml;
}
generateCards();
// cards.forEach((card) =>
//   card.addEventListener('click', () => console.log('clicked'))
// );
const genoratedCards = document.querySelectorAll('[data-match]');
genoratedCards.forEach((item) => item.addEventListener('click', flipCard));

(function shuffle() {
  genoratedCards.forEach((card) => {
    const randomOrder = Math.floor(Math.random() * cards.length);
    card.style.order = randomOrder;
  });
})();

/** *****  FADE HELPER FUNCTIONS ****************** */
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
