import GameMock from './gameMock';
import Player from '../src/player';


const player1 = Player('Jim', 'X');
const player2 = Player('Mary', 'O');
const button = document.createElement('button');
button.className = 'cell cell-1';
let currentPlayer = player1;

const game = GameMock();
const marker = game.handleCellSwapTurns(player1, player2, button);
currentPlayer = game.changeTurns(currentPlayer, player1, player2);

test('button value should be X', () => {
  expect(marker).toBe('X');
});

test('current player should Change to player2', () => {
  expect(currentPlayer).toBe(player2);
});
