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

  const showErrorMsg = (errorEle, errorClass, errorMsg) => {
    document.querySelector(errorEle).innerHTML = `<span class="text-danger" id="${errorClass}">${errorMsg}</span>`;

    setTimeout(() => {
      document.querySelector(`#${errorClass}`).remove();
    }, 2000);
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
        showErrorMsg('.game-error-msg', 'error', 'Input either X or O');
      }
    }
    marker1.addEventListener('keyup', inputChecker);
  };

  const exitGame = () => {
    displaySection('exit-game-btn', 'goodbye-section');
  };

  return {
    displayContinueToGame,
    displayInstruction,
    returnToContinueToGame,
    displayStartGame,
    checkMarker,
    exitGame,
    showErrorMsg,
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
  const renderBoard = () => {
    let cell = '';
    for (let i = 1; i <= 9; i += 1) {
      cell += `<button class="cell cell-${i}" id="cell-${i}" data-id="${i}"></button>`;
    }
    document.getElementById('display-board').innerHTML = cell;
  };
  return { renderBoard };
})();

const Game = () => {

  const compMove = () => {
    let move = 0;
    const allCellsArr = [];
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach((cell) => {
      const dataId = cell.getAttribute('data-id');
      return allCellsArr.push(dataId);
    });

    const possibleMoves = allCellsArr.filter((element) => {
      return document.getElementById(`cell-${element}`).innerText === '';
    });

    console.log(possibleMoves);

    ['X', 'O'].forEach((marker) => {
      possibleMoves.forEach((cell) => {
        document.getElementById(`cell-${cell}`).innerText = marker;
        if (checkWinner(marker)) {
          move = cell;
          return move;
        }
      });
    });
    // Math.floor(Math.random() * 10) + 1

    const cornersOpen = [];
    possibleMoves.forEach((cell) => {
      if (['1', '3', '7', '9'].includes(cell)) {
        cornersOpen.push(cell);
      }
    });

    if (cornersOpen.length > 0) {
      move = cornersOpen[Math.floor(Math.random() * (cornersOpen.length - 1))];
      return move;
    }

    if (possibleMoves.includes(5)) {
      move = 5;
      return move;
    }

    const edgesOpen = [];
    possibleMoves.forEach((cell) => {
      if (['2', '4', '6', '8'].includes(cell)) {
        edgesOpen.push(cell);
      }
    });

    if (edgesOpen.length > 0) {
      move = edgesOpen[Math.floor(Math.random() * (edgesOpen.length - 1))];
    }
    return move;
  };

  const winningCombinations = () => {
    const winningArray = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9],
      [1, 4, 7], [2, 5, 8], [3, 6, 9],
      [1, 5, 9], [3, 5, 7],
    ];
    return winningArray;
  };

  const checkWinner = (marker) => winningCombinations().some((combination) => combination.every((combinationInner) => document.getElementById(`cell-${combinationInner}`).innerText === marker));

  const tieMove = () => {
    const boardsChecked = document.querySelectorAll('.cell');
    return Array.from(boardsChecked).every((element) => element.innerText !== '');
  };

  const getEleValue = (eleId) => document.getElementById(eleId).value;

  const handleCellSwapTurns = (player1, player2) => {
    const markerOnBoard = document.querySelectorAll('.cell');
    const changeName = document.getElementById('get-turn-msg');
    let currentPlayer = player1;
    changeName.innerHTML = `${currentPlayer.getName()}, is your turn!`;
    markerOnBoard.forEach((element) => {


      // let element = '';
      // if (currentPlayer === player2) {
      //   element = document.getElementById(`cell-${compMove()}`);
      //   element.innerHTML = player2.getMarker();
      // }
      // element = ele;

      element.addEventListener('click', (e) => {
        element.innerHTML = currentPlayer.getMarker();
        element.disabled = true;
        console.log(compMove())
        if (checkWinner(currentPlayer.getMarker())) {
          changeName.innerHTML = `Congratulations, ${currentPlayer.getName()}, you won the game!`;
          currentPlayer.increaseScore();
          document.querySelector(`.${currentPlayer.getMarker()}`).innerText = `Score: ${currentPlayer.getScore()}`;
          markerOnBoard.forEach((ele) => { ele.disabled = true; });
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
  };

  const handleClickedSubmitPlayer = () => {
    function validateData(e) {
      const playersInput = document.querySelectorAll('.playgame-section .form-control');
      const playersEmptyInput = Array.from(playersInput).filter((item) => item.value === '');
      if (playersEmptyInput.length > 0) {
        const ui = UI();
        ui.showErrorMsg('.game-error-msg', 'error-inputs', 'Please fill all inputs');
      } else {
        gameBoard.renderBoard();
        document.getElementById('boardgame-section').style.display = 'block';
        document.getElementById('playgame-section').style.display = 'none';

        const player1 = Player(getEleValue('player1-name'), getEleValue('player1-marker'));
        const player2 = Player(getEleValue('player2-name'), getEleValue('player2-marker'));

        const playersInputs = document.querySelectorAll('#boardgame-section .form-control');
        Array.from(playersInputs).forEach((ele) => {
          const { id } = ele;
          ele.innerText = document.querySelector(`.playgame-section #${id}`).value;
        });

        handleCellSwapTurns(player1, player2);
      }

      e.preventDefault();
    }
    return validateData;
  };

  const playGame = () => {
    const validateform = document.getElementById('set-player-btn');
    validateform.addEventListener('click', handleClickedSubmitPlayer());
  };

  const playAgain = () => {
    const playAgainBtn = document.getElementById('play-again-btn');
    function resetGame() {
      const boardReset = document.querySelectorAll('.cell');
      boardReset.forEach((x) => {
        x.innerText = '';
        x.disabled = false;
      });
    }

    playAgainBtn.addEventListener('click', resetGame);
  };


  return { playGame, playAgain };
};

const ui = UI();
ui.displayContinueToGame();
ui.displayInstruction();
ui.returnToContinueToGame();
ui.displayStartGame();
ui.checkMarker();
ui.exitGame();

const game = Game();
game.playGame();
game.playAgain();
