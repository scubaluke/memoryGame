import { example, data, data2 } from './data.js';

// const cards = document.querySelectorAll('.card');
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

function checkForMatch() {
  const isMatch = firstCard.dataset.match === secondCard.dataset.match;
  isMatch ? disableCards() : unflipCards();
  if (checkWin()) {
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

// function nextRoundBtnMouseout() {

// }
/** **** EXAMPLE PAGE  *************** */
function nextRound(round) {
  fadeOut(winningMessage);
  resetBoard();
  generateCards(round);
  // generatedCards.forEach((item) => item.addEventListener('click', flipCard));
}
const board = document.querySelector('.board');

function generateCards(dataInput) {
  const cardHtml = [];
  dataInput.forEach((item) => {
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
  cards = document.querySelectorAll('.card');
  // sizeFont(cards);

  // cards.forEach((el) => sizeFont(el));
  // const cards = document.querySelectorAll('.card');
  cards.forEach((c) => c.addEventListener('click', flipCard));
  shuffle();
}
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
  // exampleCard.forEach((el) => isOverflown(el));

  const understandDirections = document.querySelector('.understandDirections');
  understandDirections.classList.add('show');
  board.innerHTML = exampleCard + otherCards;
}
generateCards(data);
seeExamplebtn.addEventListener('click', generateExample);
const understand = document.querySelector('.understandDirections');
const play = document.querySelector('.play');
play.addEventListener('click', () => startGame(data));
function startGame(game) {
  generateCards(game);
  shuffle();
  fadeOut(understand);
}

function shuffle() {
  cards.forEach((card) => {
    const randomOrder = Math.floor(Math.random() * cards.length);
    card.style.order = randomOrder;
  });
}

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
function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

function sizeFont(el) {
  // const el = document.getElementsByClassName(element);
  el.forEach((item) => console.log(item.style));
  console.log(el);
  // const el = document.querySelector('.directions');
  el.style.fontSize = '1rem';
  console.log(el.style);
  // el.forEach((el) => console.log(el.style.fontSize));
  // console.log(el);
  // const el = document.getelById(el);
  // let fontSize = parseInt(el.style.fontSize);
  let { fontSize } = el.style;

  console.log(fontSize);
  for (let i = fontSize; i >= 0; i--) {
    const overflow = isOverflown(el);
    if (overflow) {
      fontSize--;
      el.style.fontSize = `${fontSize}px`;
      console.log(el.style.fontSize);
    }
  }
}
