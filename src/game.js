import Player from './player';
import gameBoard from './gameBoard';
import UI from './ui';
import Logic from './logic';

const logic = Logic();
const ui = UI();

const Game = () => {
  const getEleValue = (eleId) => document.getElementById(eleId).value;

  const getPlayerInfo = () => {
    const player1 = Player(getEleValue('player1-name'), getEleValue('player1-marker'));
    const player2 = Player(getEleValue('player2-name'), getEleValue('player2-marker'));
    return [player1, player2];
  };

  const gameTurns = (currentPlayer, player1, player2) => {
    if (logic.thereIsWinner(currentPlayer.getMarker())) {
      ui.msgAlert(`Congratulations, ${currentPlayer.getName()}, you won the game!`);
      currentPlayer.increaseScore();
      document.querySelector(`.${currentPlayer.getMarker()}`).innerText = `Score: ${currentPlayer.getScore()}`;
      const markerOnBoard = document.querySelectorAll('.cell');
      markerOnBoard.forEach((ele) => { ele.disabled = true; });
    } else if (logic.tieMove()) {
      ui.msgAlert('The game is a draw');
    } else {
      currentPlayer = logic.changeTurns(currentPlayer, player1, player2);
      ui.msgAlert(`${currentPlayer.getName()}, is your turn!`);
    }
  };

  const handleCellSwapTurns = (player1, player2, board) => {
    gameBoard.renderBoard(board);
    let currentPlayer = player1;
    ui.msgAlert(`${currentPlayer.getName()}, is your turn!`);
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        const elementId = e.target.id.split('-')[1];
        logic.placeMarker(elementId, currentPlayer.getMarker());
        gameBoard.renderBoard(board);
        gameTurns(currentPlayer, player1, player2);
        currentPlayer = logic.changeTurns(currentPlayer, player1, player2);
        document.getElementById(`cell-${elementId}`).disabled = true;
      }
    });
  };

  const playAgain = () => {
    const playAgainBtn = document.getElementById('play-again-btn');
    playAgainBtn.addEventListener('click', () => {
      const player1 = getPlayerInfo()[0];
      const player2 = getPlayerInfo()[1];
      const markerOnBoard = document.querySelectorAll('.cell');
      markerOnBoard.forEach((ele) => { ele.disabled = false; });
      handleCellSwapTurns(player1, player2, logic.resetGame());
    });
  };

  const populateInputWithValues = () => {
    const player1 = getPlayerInfo()[0];
    const player2 = getPlayerInfo()[1];
    const playersInputs = document.querySelectorAll('#boardgame-section .form-control');
    Array.from(playersInputs).forEach((ele) => {
      const { id } = ele;
      ele.innerText = document.querySelector(`.playgame-section #${id}`).value;
    });

    document.getElementById('player1-score').classList.add(`${player1.getMarker()}`);
    document.getElementById('player2-score').classList.add(`${player2.getMarker()}`);
  };

  const handleClickedSubmitPlayer = () => {
    function validateData() {
      const playersInput = document.querySelectorAll('.playgame-section .form-control');
      const playersEmptyInput = Array.from(playersInput).filter((item) => item.value === '');
      if (playersEmptyInput.length > 0) {
        const ui = UI();
        ui.showErrorMsg('.game-error-msg', 'error-inputs', 'Please fill all inputs');
      } else {
        gameBoard.renderBoard(logic.boardArray);
        ui.openBoard();
        const player1 = getPlayerInfo()[0];
        const player2 = getPlayerInfo()[1];
        populateInputWithValues();
        handleCellSwapTurns(player1, player2, logic.boardArray);
      }
    }
    return validateData;
  };

  const playGame = () => {
    const validateform = document.getElementById('set-player-btn');
    validateform.addEventListener('click', handleClickedSubmitPlayer());
  };

  return { playGame, playAgain };
};

export default Game;