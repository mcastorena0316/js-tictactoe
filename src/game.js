import Player from './player';
import gameBoard from './gameBoard';
import UI from './ui';

const Game = () => {
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

  const playAgain = (player1) => {
    const playAgainBtn = document.getElementById('play-again-btn');
    function resetGame() {
      const boardReset = document.querySelectorAll('.cell');
      boardReset.forEach((x) => {
        x.innerText = '';
        x.disabled = false;
      });
      const changeName = document.getElementById('get-turn-msg');
      changeName.innerHTML = `${player1.getName()} is your turn!`;
    }

    playAgainBtn.addEventListener('click', resetGame);
  };

  const getEleValue = (eleId) => document.getElementById(eleId).value;

  const handleCellSwapTurns = (player1, player2) => {
    const markerOnBoard = document.querySelectorAll('.cell');
    const changeName = document.getElementById('get-turn-msg');
    let currentPlayer = player1;
    changeName.innerHTML = `${currentPlayer.getName()}, is your turn!`;
    markerOnBoard.forEach((element) => {
      element.addEventListener('click', (e) => {
        element.innerHTML = currentPlayer.getMarker();
        element.disabled = true;

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
        playAgain(player1);
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

        document.getElementById('player1-score').classList.add(`${player1.getMarker()}`);
        document.getElementById('player2-score').classList.add(`${player2.getMarker()}`);
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

  return { playGame, handleCellSwapTurns };
};

export default Game;