/*
Game Rules
-Player must guess a number between a min and max
-Player gets a certain number of guesses
-Notify player of guesses remaining
-Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload()
  }
})

// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value)

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }

  // Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct! YOU WIN!`)
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
    } else {
      guessInput.style.borderColor = 'red';
      // Clear input
      guessInput.value = '';
      // wrong answer
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
  }
})

// Game Over
function gameOver(won, msg) {
  let color;
  won = true ? color = 'green' : color = 'red'
  // disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  message.style.color = color;
  // Win message
  setMessage(msg)

  // Play Again
  guessBtn.value = 'Play Again'
  guessBtn.className += 'play-again';
}

// Get random winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}