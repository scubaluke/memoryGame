import { example, data, data2 } from './data.js';

// const cards = document.querySelectorAll('.card');
/** *******  GAME FUNCTIONS  ********* */
let cards;
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
const winningMessage = document.querySelector('.winningMessage');
const visitUs = document.querySelector('.visitUs');

// what round is currently being played
let roundNum = 0;
function checkForMatch() {
  const isMatch = firstCard.dataset.match === secondCard.dataset.match;
  isMatch ? disableCards() : unflipCards();
  if (checkWin()) {
    thatsRight.classList.remove('show');
    if (roundNum < 1) {
      fadeIn(winningMessage);
      roundNum += 1;
    } else {
      fadeIn(visitUs);
    }
  }
}
function checkWin() {
  return [...cards].every((card) => card.classList.contains('flip'));
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  const darkenFirst = firstCard.querySelector('p');
  darkenFirst.style.background = '#80808099';
  const darkenSecond = secondCard.querySelector('p');
  darkenSecond.style.background = '#80808099';

  fadeIn(thatsRight);
  setTimeout(() => {
    fadeOut(thatsRight);
  }, 1500);
  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    // time cards are face up *******
  }, 5000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    const randomOrder = Math.floor(Math.random() * cards.length);
    card.style.order = randomOrder;
  });
}
/** *********  GENERATE CARDS  AND BOARD ******************* */
const board = document.querySelector('.board');

function generateCards(dataInput) {
  const cardHtml = [];
  dataInput.forEach((item) => {
    cardHtml.push(`
    <div class="card" data-match="${item.match}">
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
  cards = document.querySelectorAll('.card');
  cards.forEach((c) => c.addEventListener('click', flipCard));
  shuffle();
}
generateCards(data);

/** **** EXAMPLE PAGE  *************** */
const directions = document.querySelector('.directions');
const seeExamplebtn = document.querySelector('.seeExamplebtn');
function generateExample() {
  fadeOut(directions);
  let otherCards = '';
  for (let i = 0; i < 8; i++) {
    otherCards += `<div class="card" >
<img class="backFace" src="./img/selcardback.jpeg" alt="">
</div>`;
  }
  const exampleCard = `<div class="card flip" data-match="${example[0].match}">
<p class="frontFace">${example[0].sentence}</p>
<img class="backFace" src="./img/selcardback.jpeg" alt="">
</div>
<div class="card flip" data-match="${example[0].match}">
<p class="frontFace">${example[0].word}</p>
<img class="backFace" src="./img/selcardback.jpeg" alt="">
</div></div>`;

  const understandDirections = document.querySelector('.understandDirections');
  understandDirections.classList.add('show');
  board.innerHTML = exampleCard + otherCards;
}

seeExamplebtn.addEventListener('click', generateExample);
const understand = document.querySelector('.understandDirections');
const play = document.querySelector('.play');
play.addEventListener('click', () => startGame(data));
function startGame(game) {
  generateCards(game);
  shuffle();
  fadeOut(understand);
}

function nextRound(round) {
  fadeOut(winningMessage);
  resetBoard();
  generateCards(round);
}
const thatsRight = document.querySelector('.thatsRight');
const winningMessageButton = document.querySelector('.winningMessage button');
function nextRoundBtnHovered() {
  winningMessageButton.classList.add('hovered');
  winningMessageButton.textContent = `Play Next Round! >`;
}
function nextRoundBtnUnHovered() {
  winningMessageButton.classList.remove('hovered');
  winningMessageButton.textContent = `Play Next Round!`;
}
winningMessageButton.addEventListener('mouseover', nextRoundBtnHovered);
winningMessageButton.addEventListener('mouseout', nextRoundBtnUnHovered);

winningMessageButton.addEventListener('click', () => nextRound(data2));

const playAgain = document.querySelector('.playAgain');
playAgain.addEventListener('click', () => {
  generateCards(data);
  fadeOut(visitUs);
  roundNum = 0;
});
/** *****  FADE HELPER FUNCTIONS ****************** */
function fadeIn(element) {
  element.classList.add('show');
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
