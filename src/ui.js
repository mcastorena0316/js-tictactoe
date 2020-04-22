// eslint-disable-next-line import/no-cycle
import Game from './game';
import gameBoard from './gameBoard';
import Player from './player';


const UI = () => {
  const displaySection = (clickedBtn, sectionToShow) => {
    const allSections = document.querySelectorAll('.wrapper section');
    const clickedButton = document.getElementById(clickedBtn);
    clickedButton.addEventListener('click', (e) => {
      for (let i = 0; i < allSections.length; i += 1) {
        const { id } = allSections[i];
        if (id === sectionToShow) {
          allSections[i].style.display = 'block';
        } else {
          allSections[i].style.display = 'none';
        }
      }

      e.preventDefault();
    });
  };

  const displayContinueToGame = () => {
    displaySection('start-btn', 'continue-to-game');
  };

  const displayInstruction = () => {
    displaySection('read-instruction-btn', 'read-instruction');
  };

  const returnToContinueToGame = () => {
    displaySection('return-to-continue-btn', 'continue-to-game');
  };

  const displayStartGame = () => {
    displaySection('playgame-btn', 'playgame-section');
  };

  const showErrorMsg = (errorEle, errorClass, errorMsg) => {
    document.querySelector(errorEle).innerHTML = `<span class="text-danger" id="${errorClass}">${errorMsg}</span>`;

    setTimeout(() => {
      document.querySelector(`#${errorClass}`).remove();
    }, 2000);
  };

  const checkMarker = () => {
    const marker1 = document.getElementById('player1-marker');
    function inputChecker() {
      const x = ['X', 'x'];
      const o = ['O', 'o'];
      if (x.includes(marker1.value)) {
        document.getElementById('player2-marker').value = o[x.indexOf(marker1.value)];
      } else if (o.includes(marker1.value)) {
        document.getElementById('player2-marker').value = x[o.indexOf(marker1.value)];
      } else if (marker1.value === '') {
        document.getElementById('player2-marker').value = '';
      } else {
        showErrorMsg('.game-error-msg', 'error', 'Input either X or O');
      }
    }
    marker1.addEventListener('keyup', inputChecker);
  };

  const exitGame = () => {
    displaySection('exit-game-btn', 'goodbye-section');
  };

  // eslint-disable-next-line consistent-return
  const validateData = (e) => {
    const game = Game();

    let playerArray = [];
    const playersInput = document.querySelectorAll('.playgame-section .form-control');
    const playersEmptyInput = Array.from(playersInput).filter((item) => item.value === '');
    if (playersEmptyInput.length > 0) {
      showErrorMsg('.game-error-msg', 'error-inputs', 'Please fill all inputs');
    } else {
      gameBoard.renderBoard();
      document.getElementById('boardgame-section').style.display = 'block';
      document.getElementById('playgame-section').style.display = 'none';

      const player1 = Player(game.getEleValue('player1-name'), game.getEleValue('player1-marker'));
      const player2 = Player(game.getEleValue('player2-name'), game.getEleValue('player2-marker'));

      const playersInputs = document.querySelectorAll('#boardgame-section .form-control');
      Array.from(playersInputs).forEach((ele) => {
        const { id } = ele;
        ele.innerText = document.querySelector(`.playgame-section #${id}`).value;
      });

      document.getElementById('player1-score').classList.add(`${player1.getMarker()}`);
      document.getElementById('player2-score').classList.add(`${player2.getMarker()}`);
      game.handleCellSwapTurns(player1, player2);
      playerArray = [player1, player2];
      return playerArray;
    }
    e.preventDefault();
    return playerArray;
  };

  const playGame = () => {
    const validateform = document.getElementById('set-player-btn');
    validateform.addEventListener('click', validateData);
  };

  const modifyInnerHTML = (id, player, text) => {
    const changeName = document.getElementById(id);
    if (player === '') {
      changeName.innerHTML = text;
    } else {
      changeName.innerHTML = player.getName() + text;
    }
  };

  const modifyInnerText = (selector, info, text) => {
    document.querySelector(`.${selector}`).innerText = text + info;
  };

  return {
    displayContinueToGame,
    displayInstruction,
    returnToContinueToGame,
    displayStartGame,
    checkMarker,
    exitGame,
    showErrorMsg,
    playGame,
    validateData,
    modifyInnerHTML,
    modifyInnerText,
  };
};

export default UI;