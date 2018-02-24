/*
Game Function
	-	Player must guess a number between a min and max
	- Player gets a certain amount of guesses
	- Notify player of guesses remaining
	- Notify the player of the correct answer if lose
	- Let player choose to play agian
*/

// Game Values
let min = 1,
		max = 10,
		winningNum = getRandomNum(min, max),
		guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
			minNum = document.querySelector('.min-num'),
			maxNum = document.querySelector('.max-num'),
			guessBtn = document.getElementById('guess-btn'),
			guessInput = document.getElementById('guess-input'),
			message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
	if(e.target.className === 'play-again'){
		window.location.reload();
	}
});

// Listen for guess
guessBtn.addEventListener('click', function(){
	let guess = parseInt(guessInput.value);

	// Validate
	if(isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	} 

	// Check if won
	if(guess === winningNum){
		// Gameover - won
		gameOver(true, `${winningNum} is correct, You Win!`);

		// // Disable input
		// guessInput.disabled = true;
		// // Change border colour
		// guessInput.style.borderColor = 'green';
		// // Set Message
		// setMessage(`${winningNum} is correct, You Win!`, 'green');

	} else {
		// Wrong Number
		guessesLeft -= 1;

		if(guessesLeft === 0) {
		// Gameover - lost
		gameOver(false, `Game Over, you lost! The correct number was ${winningNum}`);

		// // Disable input
		// guessInput.disabled = true;
		// // Change border colour
		// guessInput.style.borderColor = 'red';
		// // Set Message
		// setMessage(`Game Over, you lost! The correct number was ${winningNum}`, 'red');

		} else {

		// Change border colour
		guessInput.style.borderColor = 'red';
		// Clear Input
		guessInput.value = '';
		// Game continues - answer wrong
		setMessage(`${guess} is not correct, ${guessesLeft} guesses remaining`, 'red');
		}
	}
});

// Game over
function gameOver(won, msg){
	let color;

	won === true ? color = 'green' : color = 'red';

	// Disable input
		guessInput.disabled = true;
		// Change border colour
		guessInput.style.borderColor = color;
		// Set text color
		message.style.color = color;
		// Set Message
		setMessage(msg);

		// Play Again?
		guessBtn.value = 'Play Again';
		guessBtn.className += 'play-again';
}

// Get Winning Num
function getRandomNum(min, max){
	return Math.floor(Math.random()*(max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}