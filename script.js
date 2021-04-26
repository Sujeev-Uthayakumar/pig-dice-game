'use strict';

//Selecting elements
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');

const scoreElement0 = document.querySelector('#score--0');
const scoreElement1 = document.querySelector('#score--1');
const currentElement0 = document.querySelector('#current--0');
const currentElement1 = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

scoreElement0.textContent = 0;
scoreElement1.textContent = 0;
diceElement.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let currentPlayer = 0;
let playing = true;

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Random dice roll
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    //Displays the dice roll
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceNumber}.png`;
    //Checks for 1
    if (diceNumber !== 1) {
      currentScore = currentScore + diceNumber;
      document.querySelector(
        `#current--${currentPlayer}`
      ).textContent = currentScore;
    } else {
      document.querySelector(`#current--${currentPlayer}`).textContent = 0;
      currentScore = 0;
      currentPlayer = currentPlayer === 0 ? 1 : 0; //Current player if equal to 0, then it becomes 1 else it stays 0
      playerElement0.classList.toggle('player--active');
      playerElement1.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Adds to total score depending on player
    scores[currentPlayer] += currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    //Checks the score, to determine winner
    if (scores[currentPlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      //Switches the user and resets current score
      document.querySelector(`#current--${currentPlayer}`).textContent = 0;
      currentScore = 0;
      currentPlayer = currentPlayer === 0 ? 1 : 0; //Current player if equal to 0, then it becomes 1 else it stays 0
      playerElement0.classList.toggle('player--active');
      playerElement1.classList.toggle('player--active');
    }
  }
});

btnNew.addEventListener('click', function () {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  playing = true;
  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;
  currentElement0.textContent = 0;
  currentElement1.textContent = 0;
  diceElement.classList.add('hidden');
  playerElement0.classList.add('player--active');
  playerElement1.classList.remove('player--active');
  playerElement0.classList.remove('player--winner');
  playerElement1.classList.remove('player--winner');
});
