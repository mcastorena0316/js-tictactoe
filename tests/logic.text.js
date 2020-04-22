import Game from '../src/game';
import Logic from '../src/logic';
import Player from '../src/player';
const logic = Logic();

test('should place a marker on the board cell', () => {
  logic.placeMarker(1, 'X');
  expect(logic.boardArray).toStrictEqual(['X', '', '', '', '', '', '', '', '']);
  // board.resetGame();
});

test('should check for non empty space in all cells', () => {
  for (let i = 1; i <= 5; i += 1) {
    logic.placeMarker(i, 'X');
  }

  for (let i = 5; i <= 5; i += 1) {
    logic.placeMarker(i, 'O');
  }

  const empty = logic.boardArray.every((item) => {
    return item !== '';
  });

  expect(empty).toBe(true);
});

test('should reset the game', () => {
  logic.resetGame();
  expect(logic.boardArray).toStrictEqual(['', '', '', '', '', '', '', '', '']);
});

test('check if a player 1', () => {
  logic.resetGame();
  expect(logic.boardArray).toStrictEqual(['', '', '', '', '', '', '', '', '']);
});
