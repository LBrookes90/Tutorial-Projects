let numSquares = 6;
let colors = [];
let pickedColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById('colorDisplay');
const messageDisplay = document.getElementById('message');
const h1 = document.querySelector('h1');
const resetBtn = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode');

init();

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}


function setUpModeButtons(){
	// mode button event listeners
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');
			if(this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			reset();
		});
	}
}

function setUpSquares() {
	// Squares event listeners
	for(var i = 0; i < squares.length; i++){
		// add click listeners to squares
		squares[i].addEventListener("click", function(){
			// grab color of clicked square
			const clickedColor = this.style.backgroundColor;
			// compare color to picked color
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct";
				resetBtn.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
					this.style.backgroundColor = "#232323";
					messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset(){
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	// change text on reset button
	resetBtn.textContent = "New Colors";

	messageDisplay.textContent = "";
	// change color of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		
	}
	// reset header color
	h1.style.backgroundColor = "steelblue";
}

resetBtn.addEventListener("click", reset);

function pickColor() {
	let randomColor = Math.floor(Math.random() * colors.length);
	return colors[randomColor];
}

function changeColors(color) {
	// loop through all squares
	for(var i = 0; i < squares.length; i++) {
		// change each color to match given color
		squares[i].style.backgroundColor = pickedColor;
	}
}

function generateRandomColors(num){
	// make an array
	const arr = [];
	// add num random colors to array
	for(var i = 0; i < num; i++){
		// get random color and push into arr
		arr.push(randomColor());
	}
	// return that array
	return arr;
}

function randomColor(){
	// pick a red 0 to 255
	const r = Math.floor(Math.random() * 256);
	// pick a green from 0 to 255
	const g = Math.floor(Math.random() * 256);
	// pick a blue from 0 to 255
	const b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}