import UI from './ui';
import Game from './game';

const ui = UI();
ui.displayContinueToGame();
ui.displayInstruction();
ui.returnToContinueToGame();
ui.displayStartGame();
ui.checkMarker();
ui.exitGame();

const game = Game();
game.playGame();
// game.playAgain();
