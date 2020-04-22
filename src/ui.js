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

  const openBoard = () => {
    document.getElementById('boardgame-section').style.display = 'block';
    document.getElementById('playgame-section').style.display = 'none';
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

  const msgAlert = (msg) => {
    const changeName = document.getElementById('get-turn-msg');
    changeName.innerHTML = msg;
  };

  return {
    displayContinueToGame,
    displayInstruction,
    returnToContinueToGame,
    displayStartGame,
    checkMarker,
    exitGame,
    showErrorMsg,
    openBoard,
    msgAlert,
  };
};

export default UI;