const Logic = (() => {
  let boardArray = ['', '', '', '', '', '', '', '', ''];

  const placeMarker = (cell, marker) => {
    boardArray[cell - 1] = marker;
  };

  const winningCombinations = () => {
    const winningArray = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9],
      [1, 4, 7], [2, 5, 8], [3, 6, 9],
      [1, 5, 9], [3, 5, 7],
    ];
    return winningArray;
  };

  const thereIsWinner = (marker) => winningCombinations().some((combination) => combination.every((combinationInner) => boardArray[combinationInner - 1] === marker));

  const tieMove = () => boardArray.every((item) => item !== '');

  const changeTurns = (currentPlayer, player1, player2) => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return currentPlayer;
  };

  const getFilledCell = () => {
    const filledCell = [];
    boardArray.forEach((item, index) => {
      if (item !== '') {
        filledCell.push(index + 1);
      }
    });
    return filledCell;
  };

  const isEmpty = () => boardArray.every((item) => item === '');

  const resetGame = () => {
    boardArray = [];
    for (let i = 0; i < 9; i += 1) {
      boardArray.push('');
    }
    return boardArray;
  };

  return {
    boardArray,
    winningCombinations,
    thereIsWinner,
    changeTurns,
    placeMarker,
    tieMove,
    resetGame,
    getFilledCell,
    isEmpty,
  };
});

export default Logic;