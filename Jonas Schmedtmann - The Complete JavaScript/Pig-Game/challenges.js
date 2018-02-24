/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

init();

var prevRoll;

document.querySelector('.btn-roll').addEventListener('click', function() {
      if (gamePlaying) {
          // 1.Random Number
          var dice0 = Math.floor(Math.random() * 6) + 1;
          var dice1 = Math.floor(Math.random() * 6) + 1;

          // 2. Display the resuly
        document.getElementById('dice-0').style.display = 'block';
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-0').src = 'dice-' + dice0 + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';

          //3. Player loses all of their points IF they roll two 6's in a row
          if (dice0 !== 1 && dice1 !== 1 ) {
           // Add score
           roundScore += dice0 + dice1;
           document.querySelector('#current-' + activePlayer).textContent = roundScore;
         } else {
           // Next Player
             nextPlayer();
           }
          /*if (dice === 6 && prevDice === 6)  {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
          } else if (dice !== 1 ) {
           // Add score
           roundScore += dice;
           document.querySelector('#current-' + activePlayer).textContent = roundScore;
         } else {
           // Next Player
             nextPlayer();
           }

          prevDice = dice;
          */
      }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
    // Add Current Score to Global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var inputScore = document.querySelector('.final-score').value;
    var winningScore;

    // Undefined, 0, null or "" are Coerced to false
    // Anything else is Coerced to true.
    if (inputScore) {
      winningScore = inputScore;
    } else {
      winningScore = 100;
    }

    // Check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      docuent.getElementById('dice-0').style.display = 'none';
      docuent.getElementById('dice-1').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }

});

function nextPlayer () {
  // Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');

   //  document.querySelector('.player-0-panel').classList.remove('active');
   //  document.querySelector('.player-1-panel').classList.add('active');

   document.getElementById('dice-0').style.display = 'none';
   document.getElementById('dice-1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById('dice-0').style.display = 'none';
  document.getElementById('dice-1').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}




// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em'>
// var x = document.querySelector('#score-0').textContent;
