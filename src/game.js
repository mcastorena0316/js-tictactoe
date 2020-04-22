// eslint-disable-next-line import/no-cycle
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
      const ui = UI();
      ui.modifyInnerHTML('get-turn-msg', player1, ' is your turn!');
    }
    playAgainBtn.addEventListener('click', resetGame);
    return resetGame();
  };

  const getEleValue = (eleId) => document.getElementById(eleId).value;

  const changeTurns = (currentPlayer, player1, player2) => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return currentPlayer;
  };

  const updateBoard = (currentPlayer, element) => {
    element.innerHTML = currentPlayer.getMarker();
    element.disabled = true;
  };

  const verifyWinnerorTie = (currentPlayer) => {
    let result = '';
    if (checkWinner(currentPlayer.getMarker())) {
      currentPlayer.increaseScore();
      result = 'won';
    } else if (tieMove()) {
      result = 'tie';
    }

    return result;
  };
  const handleCellSwapTurns = (player1, player2) => {
    const ui = UI();
    const markerOnBoard = document.querySelectorAll('.cell');
    let currentPlayer = player1;
    ui.modifyInnerHTML('get-turn-msg', currentPlayer, ' is your turn!');

    markerOnBoard.forEach((element) => {
      element.addEventListener('click', (e) => {
        updateBoard(currentPlayer, element);

        if (verifyWinnerorTie(currentPlayer) === 'won') {
          ui.modifyInnerHTML('get-turn-msg', currentPlayer, ' Congratulations! You won the game');
          ui.modifyInnerText(currentPlayer.getMarker(), currentPlayer.getScore(), 'Score: ');
          markerOnBoard.forEach((ele) => { ele.disabled = true; });
        } else if (verifyWinnerorTie(currentPlayer) === 'tie') {
          ui.modifyInnerHTML('get-turn-msg', '', ' The game is a draw');
        } else {
          currentPlayer = changeTurns(currentPlayer, player1, player2);
          ui.modifyInnerHTML('get-turn-msg', currentPlayer, ' is your turn!');
        }

        e.preventDefault();
      });
    });
    playAgain(player1);
  };

  return {
    handleCellSwapTurns, getEleValue, playAgain, changeTurns, verifyWinnerorTie, checkWinner,
  };
};

export default Game;