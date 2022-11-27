'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Set up initial conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Define variables
let scores = [0, 0];
let currentScore = 0;
let currentPlayer = 0;

// functions
function rollDice() {
  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceRoll}.png`;
  return diceRoll;
}

function switchPlayer() {
  // clear current scores
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  // switch player
  currentPlayer = (currentPlayer + 1) % 2;
  // toggle player--active class for both players
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Set up button logic
btnRoll.addEventListener('click', function () {
  const diceValue = rollDice();
  if (diceValue === 1) {
    switchPlayer();
  } else {
    currentScore += diceValue;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  }
});

btnHold.addEventListener('click', function () {
  // update overall score for this player
  scores[currentPlayer] += currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];

  if (scores[currentPlayer] >= 20) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
  } else {
    // switch player
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentPlayer = 0;
  currentScore = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});
