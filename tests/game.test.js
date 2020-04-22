import Game from '../src/game';
import Player from '../src/player';


const player1 = Player('Jim', 'X');
const player2 = Player('Mary', 'O');

let currentPlayer = player1;

const game = Game();


test('current player should Change to player2', () => {
  currentPlayer = game.changeTurns(currentPlayer, player1, player2);
  expect(currentPlayer).toBe(player2);
});