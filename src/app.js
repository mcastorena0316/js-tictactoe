/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

const UI = () => {
  const displaySection = (clickedBtn, sectionToShow) => {
    const allSections = document.querySelectorAll('.wrapper section');
    const clickedButton = document.getElementById(clickedBtn);
    clickedButton.addEventListener('click', (e) => {
      for (let i = 0; i < allSections.length; i += 1) {
        const { id } = allSections[i];
        if (id === sectionToShow) {
          allSections[i].style.display = 'block';
        } else {
          allSections[i].style.display = 'none';
        }
      }

      e.preventDefault();
    });
  };

  const displayContinueToGame = () => {
    displaySection('start-btn', 'continue-to-game');
  };

  const displayInstruction = () => {
    displaySection('read-instruction-btn', 'read-instruction');
  };

  const returnToContinueToGame = () => {
    displaySection('return-to-continue-btn', 'continue-to-game');
  };

  const displayStartGame = () => {
    displaySection('playgame-btn', 'playgame-section');
  };

  const checkMarker = () => {
    const marker1 = document.getElementById('player1-marker');

    function inputChecker() {
      const x = ['X', 'x'];
      const o = ['O', 'o'];
      if (x.includes(marker1.value)) {
        document.getElementById('player2-marker').value = o[x.indexOf(marker1.value)];
      } else if (o.includes(marker1.value)) {
        document.getElementById('player2-marker').value = x[o.indexOf(marker1.value)];
      } else if (marker1.value === '') {
        document.getElementById('player2-marker').value = '';
      } else {
        alert('Select a valid marker');
      }
    }
    marker1.addEventListener('keyup', inputChecker);
  };

  return {
    displayContinueToGame,
    displayInstruction,
    returnToContinueToGame,
    displayStartGame,
    checkMarker,
  };
};

const Player = (name, marker) => {
  let score = 0;
  const getName = () => name;
  const getMarker = () => marker;
  const increaseScore = () => score += 1;
  const getScore = () => score;
  return {
    getName, getMarker, getScore, score, increaseScore,
  };
};


const gameBoard = (() => {
  const showBoard = () => {
    let cell = '';
    for (let i = 1; i <= 9; i += 1) {
      cell += `<button class="cell cell-${i}" id="cell-${i}"></button>`;
    }
    document.getElementById('display-board').innerHTML = cell;
  };

  return { showBoard };
})();

const TicTacToe = () => {
  const winningCombinations = () => {
    const winningArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    return winningArray;
  };

  const checkWinner = (marker) => winningCombinations().some((combination) => combination.every((combinationInner) => document.getElementById(`cell-${combinationInner}`).innerText === marker));

  const tieMove = () => {
    const boardsChecked = document.querySelectorAll('.cell');
    return Array.from(boardsChecked).every((element) => element.innerText !== '');
  };

  const displayBoard = () => {
    function validateData(e) {
      const playersInput = document.querySelectorAll('.playgame-section .form-control');
      const playersEmptyInput = Array.from(playersInput).filter((item) => item.value === '');
      if (playersEmptyInput.length > 0) {
        alert('Fill all your inputs');
      } else {
        gameBoard.showBoard();
        document.getElementById('boardgame-section').style.display = 'block';
        document.getElementById('playgame-section').style.display = 'none';
        const playerOneName = document.getElementById('player1-name').value;
        const playerOneMarker = document.getElementById('player1-marker').value;
        const playerTwoName = document.getElementById('player2-name').value;
        const playerTwoMarker = document.getElementById('player2-marker').value;
        document.querySelector('#player1-score').classList.add(playerOneMarker);
        document.querySelector('#player2-score').classList.add(playerTwoMarker);
        const player1 = Player(playerOneName, playerOneMarker);
        const player2 = Player(playerTwoName, playerTwoMarker);

        const playersInputs = document.querySelectorAll('#boardgame-section .form-control');
        Array.from(playersInputs).forEach((ele) => {
          const { id } = ele;
          // eslint-disable-next-line no-param-reassign
          ele.innerText = document.querySelector(`.playgame-section #${id}`).value;
        });

        const markerOnBoard = document.querySelectorAll('.cell');
        let currentPlayer = player1;
        const changeName = document.getElementById('get-turn-msg');
        changeName.innerHTML = `${currentPlayer.getName()}, is your turn!`;
        markerOnBoard.forEach((element) => {
          element.addEventListener('click', (e) => {
            // eslint-disable-next-line no-param-reassign
            element.innerHTML = currentPlayer.getMarker();
            element.disabled = true;

            if (checkWinner(currentPlayer.getMarker())) {
              changeName.innerHTML = `Congratulations, ${currentPlayer.getName()}, you won the game!`;
              currentPlayer.increaseScore();
              document.querySelector(`.${currentPlayer.getMarker()}`).innerText = `Score: ${currentPlayer.getScore()}`;
              markerOnBoard.forEach((ele) => {
                ele.disabled = true;
              });
            } else {
              currentPlayer = currentPlayer === player1 ? player2 : player1;
              changeName.innerHTML = `${currentPlayer.getName()}, is your turn!`;
              if (tieMove()) {
                changeName.innerHTML = 'The game is a draw';
              }
            }


            e.preventDefault();
          });
        });
      }

      e.preventDefault();
    }
    const validateform = document.getElementById('set-player-btn');
    validateform.addEventListener('click', validateData);
  };

  const playAgain = () => {
    const playAgainBtn = document.getElementById('play-again-btn');
    playAgainBtn.addEventListener('click', resetGame);

    function resetGame() {
      const boardReset = document.querySelectorAll('.cell');
      boardReset.forEach((x) => {
        x.innerText = '';
        x.disabled = false;
      });
    }
  };

  return { displayBoard, playAgain };
};

const ui = UI();
ui.displayContinueToGame();
ui.displayInstruction();
ui.returnToContinueToGame();
ui.displayStartGame();
ui.checkMarker();

const tictactoe = TicTacToe();
tictactoe.displayBoard();
tictactoe.playAgain();
