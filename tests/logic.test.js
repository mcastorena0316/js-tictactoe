import Logic from '../src/logic';
import Player from '../src/player';

const logic = Logic();


const player1 = Player('Jim', 'X');
const player2 = Player('Mary', 'O');


test('should place a marker on the board cell', () => {
  logic.placeMarker(1, 'X');
  expect(logic.boardArray).toStrictEqual(['X', '', '', '', '', '', '', '', '']);
});

test('should check for non empty space in all cells', () => {
  for (let i = 1; i <= 5; i += 1) {
    logic.placeMarker(i, 'X');
  }

  for (let i = 5; i <= 9; i += 1) {
    logic.placeMarker(i, 'O');
  }

  const notEmpty = logic.boardArray.every((item) => item !== '');

  expect(notEmpty).toBeTruthy();
});

test('should reset the game', () => {
  const emptyArray = logic.resetGame();
  expect(emptyArray).toStrictEqual(['', '', '', '', '', '', '', '', '']);
});

test('should change turns, starting from Player1 and then switching to player2', () => {
  let currentPlayer = player1;
  currentPlayer = logic.changeTurns(currentPlayer, player1, player2);
  expect(currentPlayer).toBe(player2);
});

test(' player 1 should be the winner ', () => {
  logic.placeMarker(1, 'X');
  logic.placeMarker(2, 'X');
  logic.placeMarker(3, 'X');
  expect(logic.thereIsWinner(player1.getMarker())).toBeTruthy();
});

test('player 2 should not be the winner', () => {
  logic.placeMarker(1, 'X');
  logic.placeMarker(2, 'O');
  logic.placeMarker(3, 'X');
  logic.placeMarker(4, 'X');
  logic.placeMarker(5, 'X');
  logic.placeMarker(6, 'O');
  logic.placeMarker(7, 'O');
  logic.placeMarker(8, 'X');
  logic.placeMarker(9, '0');
  expect(logic.thereIsWinner(player2.getMarker())).toBeFalsy();
});

test('should be a tie', () => {
  logic.placeMarker(1, 'X');
  logic.placeMarker(2, 'O');
  logic.placeMarker(3, 'X');
  logic.placeMarker(4, 'X');
  logic.placeMarker(5, 'X');
  logic.placeMarker(6, 'O');
  logic.placeMarker(7, 'O');
  logic.placeMarker(8, 'X');
  logic.placeMarker(9, '0');
  expect(logic.tieMove()).toBeTruthy();
});