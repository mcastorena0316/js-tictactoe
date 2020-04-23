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
  logic.resetGame();
});

test('should check for filled cells', () => {
  [1, 2, 4].forEach((item) => {
    logic.placeMarker(item, 'X');
  });

  [3, 6].forEach((item) => {
    logic.placeMarker(item, 'O');
  });

  expect(logic.getFilledCell()).toStrictEqual([1, 2, 3, 4, 6]);
  logic.resetGame();
});

test('should reset the game', () => {
  [3, 6, 8, 7].forEach((item) => {
    logic.placeMarker(item, 'O');
  });

  logic.resetGame();
  expect(logic.isEmpty()).toBe(true);
});

test('should change turns, starting from player1 and then switching to player2', () => {
  let currentPlayer = player1;
  currentPlayer = logic.changeTurns(currentPlayer, player1, player2);
  expect(currentPlayer).toBe(player2);
});

test('player 1 should be the winner ', () => {
  for (let i = 1; i <= 3; i += 1) {
    logic.placeMarker(i, 'X');
  }
  expect(logic.thereIsWinner(player1.getMarker())).toBeTruthy();
});

test('player 2 should not be the winner', () => {
  [1, 3, 4, 5, 8].forEach((item) => {
    logic.placeMarker(item, 'X');
  });

  [2, 6, 7, 9].forEach((item) => {
    logic.placeMarker(item, 'X');
  });
  expect(logic.thereIsWinner(player2.getMarker())).toBeFalsy();
});

describe('Test if someone wins', () => {
  test('check if a player won by row', () => {
    [1, 2, 3].forEach((item) => {
      logic.placeMarker(item, 'O');
    });
    expect(logic.thereIsWinner(player2.getMarker())).toBeTruthy();
    logic.resetGame();
  });

  test('check if a player won by column', () => {
    [2, 5, 8].forEach((item) => {
      logic.placeMarker(item, 'X');
    });
    expect(logic.thereIsWinner(player1.getMarker())).toBeTruthy();
    logic.resetGame();
  });

  test('check if a player won by diagonal', () => {
    [3, 5, 7].forEach((item) => {
      logic.placeMarker(item, 'X');
    });
    expect(logic.thereIsWinner(player1.getMarker())).toBeTruthy();
    logic.resetGame();
  });
});


test('should be a tie', () => {
  [1, 3, 4, 5, 8].forEach((item) => {
    logic.placeMarker(item, 'X');
  });

  [2, 6, 7, 9].forEach((item) => {
    logic.placeMarker(item, 'X');
  });
  expect(logic.tieMove()).toBeTruthy();
});