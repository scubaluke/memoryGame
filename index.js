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
  // setFontSize();
  // sizeFont();
}
// function setFontSize() {
//   cards = document.querySelectorAll('.card');
//   const style = getComputedStyle(cards);

//   console.log([...cards]);
//   for (let i = 0; i < cards.length; i++) {
//     // console.log(cards[i].offsetWidth * 0.05);
//     console.log(cards[i].style);
//     const relFontsize = cards[i].offsetWidth * 0.05;
//     cards[i].style.fontSize = `${relFontsize}px`;
//     console.log(relFontsize);
//   }
// }
// function isOverflown(element) {
//   console.log(element.scrollHeight);
//   console.log(element.clientHeight);
//   console.log(element.scrollHeight > element.clientHeight);
//   return (
//     element.scrollHeight > element.clientHeight ||
//     element.scrollWidth > element.clientWidth
//   );
// }

// function sizeFont() {
//   cards = document.querySelectorAll('.card');

//   cards.forEach((item) => {
//     const style = getComputedStyle(item);
//     // console.log(style.fontSize);
//     // console.log(fontSize);
//     let fontSize = parseInt(style.fontSize);

//     for (let i = fontSize; i >= 0; i--) {
//       const overflow = isOverflown(item);
//       if (overflow) {
//         console.log(fontSize);
//         fontSize -= 1;
//         console.log(fontSize);
//         item.style.fontSize = `${fontSize}px`;
//       }
//     }
//   });
// }

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

// window.onload = function (event) {
//   flexFont();
// };
// window.onresize = function (event) {
//   flexFont();
// };
// const testing = document.querySelector('.directions');
// const style = getComputedStyle(testing);
// console.log(style);
