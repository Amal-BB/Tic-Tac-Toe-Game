//Wait for the DOM to finish loading before start running the game
// Add event listeners to they game cells element 

document.addEventListener("DOMContentLoaded", function () {
  const xIconSrc = 'assets/images/x-icon.png';
  const oIconSrc = 'assets/images/o-icon.png';

  // create new game variable
  function newGame() {
    const nGame = {
      nextTurn: null,
      player: {
        playerIcon: 'X',
        states: [],
        score: 0,
      },
      computer: {
        computerIcon: 'O',
        states: [],
        score: 0,
      },
      ties: 0,
      availableCells: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
    };
    return nGame;
  }
  let game = newGame();
  const winningStates = [
    // Rows
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],

    // Columns
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],

    // Diagonal
    ['0', '4', '8'],
    ['2', '4', '6']
  ];
  let gameEnd = false;

  const cells = document.getElementsByClassName('cell');
  // set event listener for player icon change 
  document.getElementById('player').addEventListener('click', function () {
    changePlayerIcon(xIconSrc, oIconSrc, gameEnd);
  });
  // set event listener for dialog box input buttons 
  document.getElementsByTagName('input')[0].addEventListener('click', function () {
    dbox(this, );
  });
  document.getElementsByTagName('input')[1].addEventListener('click', function () {
    dbox(this, );
  });

  document.getElementsByTagName('input')[0].addEventListener('keypress', function (event) {
    if (event.key == "Enter")
      dbox(this, );
  });
  document.getElementsByTagName('input')[1].addEventListener('keypress', function (event) {
    if (event.key == "Enter")
      dbox(this, );
  });
  /**
   * Steps action for each game cell clicked before start or continue run the game 
   */
  function cellClickedAction() { 
    // check if game not end
    if (game.availableCells.length != 0 && !gameEnd) {
      // check if it is not computer turn
      if (game.nextTurn != 'computer')
        if (!this.hasAttribute("data-type")) //check if the cell not selected before
        { // assign players X or O icon image depend on player's choice 
        let playerIconSrc = document.getElementById("player-icon").alt == 'x-icon' ? xIconSrc : oIconSrc;
        let computerIconSrc = playerIconSrc == oIconSrc ? xIconSrc : oIconSrc;
        runGame(this, playerIconSrc, computerIconSrc);
        }
    }

  }
  // set event listener for game cells 
  for (let cell of cells) {
    console.log(cell.hasAttribute("data-type"));
    cell.addEventListener("click", cellClickedAction);
  }

  /**  
   * The main function to run the game, 
   * called after user clicked on the game cell, 
   * or in case of computer turn if the player choose continue the game after it end
   */
  async function runGame(cell, playerIconSrc, computerIconSrc) {
    if (cell != null) {
      let myPromise = new Promise(function (resolve) {
        resolve('<img src=' + playerIconSrc + ' />');
      });

      cell.innerHTML = await myPromise; //display player icon img on the clicked game cell
      cell.setAttribute("data-type", 'player');
      //change play turn
      changeTurn('computer', 'player');
      game.player.playerIcon = playerIconSrc == xIconSrc ? 'X' : 'O';
      console.log("item id:" + cell.getAttribute("data-id"));
      game.player.states.push(cell.getAttribute("data-id"));
      // remove selected cell number from game avaliableCells
      removeSlectedCell(cell.getAttribute("data-id"));

      // check if player reach 3 play turns or more  
      if (game.player.states.length >= 3) {
        //check if player has winning states
        console.log("check user palyer winning states");
        gameEnd = checkGameWinner(game.player, "Player");
      }
    }
    console.log("player statues:" + game.player.states);
    console.log("computer statues:" + game.computer.states);

    if (!gameEnd) {
      // set computer state for computer turn
      let computerState = getComputerState();
      console.log("computer-random=" + computerState);

      // make a delay for img to show it in the screen before exceute next code
      let myPromise = new Promise(function (resolve) {
        setTimeout(function () {
          resolve('<img src=' + computerIconSrc + ' />');
        }, 700);
      });

      // display computer icon on the game cell that has data-id = the computer state 
      for (let c of cells)
        if (c.getAttribute("data-id") == computerState) {
          c.innerHTML = await myPromise; // wait until image icon is shown on the selected cell
          c.setAttribute("data-type", 'computer'); // add this attribute to cell to know it has been used by computer
          console.log("computer data-id:" + c.getAttribute("data-id"));
          game.computer.playerIcon = game.player.playerIcon == 'X' ? 'O' : 'X'; // check which icon player has been selected
          game.computer.states.push(computerState);
          removeSlectedCell(computerState); // remove selected cell from game avalible cells
          break;
        }
      // change nextTurn 
      changeTurn('player', 'computer');
      if (game.computer.states.length >= 3) {
        console.log("check if computer winning states");
        //check if computer has winning states
        gameEnd = checkGameWinner(game.computer, "Computer");
      }

    }
  }

  /**
   * Chang game play turn and, 
   * Set play-turn style to current player turn 
   */
  function changeTurn(nextTurn, previousTurn) {
    game.nextTurn = nextTurn;
    console.log("nextTurn: " + nextTurn + '  previousTurn:' + previousTurn);
    document.getElementById(nextTurn).classList.toggle("play-turn");
    document.getElementById(previousTurn).classList.toggle("play-turn");
  }

  // remove the data-id value of selected cell from game available cells
  function removeSlectedCell(cellId) {
    let index = game.availableCells.indexOf(cellId);
    if (index != -1)
      game.availableCells.splice(index, 1);
  }
  // choose best state value (cell data-id) for computer turn
  function getComputerState() {
    let match = null;
    if (game.computer.states.length >= 2) {
      // check for matched winning state to previous computer's selected states
      match = checkMatchedWinningState(game.computer.states);
      if (match != null) return match;
    }
    if (game.player.states.length >= 2) {
      // check for matched winning state to previous player's selected states
      match = checkMatchedWinningState(game.player.states);
      if (match != null) return match;
    }
    // select randome state (cell data-id) from game avaliable cells
    return game.availableCells[Math.floor(Math.random() * game.availableCells.length)];

  }

  /**
   * search for matched game winning state to assign it for computer state turn
   * @param {*} playerStates, could be player or computer previous states
   * @returns matched available cell data-id of winningSatate or null 
   */
  function checkMatchedWinningState(playerStates) {
    if (playerStates != null) {
      let i = 0;
      let state;
      do {
        state = winningStates[i++];
        console.log("winning state" + i - 1 + ": " + state);
        console.log("playerStates: " + playerStates);
        let matchedStates = 0;
        playerStates.forEach(s => {
          if (state.includes(s))
            ++matchedStates;
        });
        if ((playerStates.length >= 2 && matchedStates == 2) || (playerStates.length == 1 && matchedStates != 0))
          for (let j = 0; j < 3; j++) {
            console.log("include States: " + state[j]);
            // check if the cell data-id of the matched winning state is not selected
            if (game.availableCells.includes(state[j])) {
              console.log("game.availableCells: " + game.availableCells);
              return state[j];

            }
          }

      } while (i < winningStates.length);
      return null;
    }
  }

  // check the winner player 
  function checkGameWinner(player, pName) {
    console.log("player states : " + player.states);
    // check if player or computer's selected states matched one of the game winning states
    for (let state of winningStates)
      if (state.every(s => player.states.includes(s))) {
        console.log("check : " + state);
        //keep just icons on cells of winning state highlighted 
        Array.from(cells).forEach(c => {
          if (c.hasAttribute("data-type") && !state.includes(c.getAttribute("data-id")))
            c.children[0].classList.add("low_opacity");
        });
        // calcaulate game score to display it 
        if (pName == 'Player') {
          document.getElementById("player").children[1].textContent = ++player.score;
          changeTurn('player', 'computer');
        } else {
          document.getElementById("computer").children[1].textContent = ++player.score;
          changeTurn('computer', 'player');
        }
        //game.nextTurn=pName.toLowerCase();
        console.log(game.nextTurn);
        //send winner player name to gameOver to end the game
        gameOver(pName + " " + player.playerIcon + " ...Win !");
        return true;
      }

    if (game.availableCells.length == 0) {
      gameOver();
      return true;
    }
    return false;
  }

  // End the game
  function gameOver(msg) {
    if (msg == undefined) {
      msg = "Game Over";
      // calculate the game ties score to save it and display it
      document.getElementById("ties").children[1].textContent = ++game.ties;
    }
    //show the msg that included the winner name in a dialog box 
    setTimeout(() => dbox(null, msg), 900);

  }

  // Create function to show dialog box with two options
  function dbox(element, msg) {
    if (msg != undefined) {
      document.getElementById("boxTxt").innerHTML = msg;
      document.getElementById("boxBack").classList.add("show");
    } else {
      document.getElementById("boxBack").classList.remove("show");
      // clear all X and O icon images from game cells
      Array.from(document.getElementsByClassName("cell")).forEach(c => {
        if (c.hasChildNodes()) c.children[0].remove();
        //c.removeChild(c.children[0]);
        if (c.hasAttribute("data-type"))
          c.removeAttribute("data-type");
      });
      gameEnd = false;
      if (element.value == 'Restart') {
        changeTurn('player', 'computer');
        game = newGame();
        document.getElementById("player").children[1].textContent = 0;
        document.getElementById("computer").children[1].textContent = 0;
        document.getElementById("ties").children[1].textContent = 0;
      } else {
        game.player.states = [];
        game.computer.states = [];
        console.log(game.player.states);
        game.availableCells = newGame().availableCells;
        if (game.nextTurn == 'computer') { // (async () => {
          let playerIconSrc = document.getElementById("player-icon").alt == 'x-icon' ? xIconSrc : oIconSrc;
          let computerIconSrc = playerIconSrc == oIconSrc ? xIconSrc : oIconSrc;
          runGame(null, playerIconSrc, computerIconSrc);

          // })();
        }
      }
    }
  }
});

// Create function for menu elements click event to change the display area.
function changeDisplayArea(element) {
  // get the active element in game menu
  let activeElement = document.getElementsByClassName('active')[0];
  // check if the clicked element isn't the active element
  if (element != activeElement) {
    // remove active class from unclicked element
    activeElement.classList.remove("active");
    // add active class to the clicked element 
    element.classList.add('active');
    if (element.id == 'play') {
      document.getElementById('play-area').style.display = 'block';
      document.getElementById('instruction-area').style.display = 'none';
    } else {
      document.getElementById('play-area').style.display = 'none';
      document.getElementById('instruction-area').style.display = 'block';
    }
  }

}

/** 
 * Do swap between player icon and computer icon (X and O),
 * This happen when player click on his symble(icon) to change it 
 * */
function changePlayerIcon(xIconSrc, oIconSrc, gameEnd) {
  if (gameEnd) return; // check if game is in end state
  const playerIcon = document.getElementById("player-icon");
  const computerIcon = document.getElementById("computer-icon");
  console.log(playerIcon);
  console.log(playerIcon.alt);
  if (playerIcon.alt == "o-icon") {
    playerIcon.setAttribute("src", xIconSrc);
    playerIcon.setAttribute("alt", "x-icon");
    computerIcon.setAttribute("src", oIconSrc);
    computerIcon.setAttribute("alt", "o-icon");
  } else {
    playerIcon.setAttribute("src", oIconSrc);
    playerIcon.setAttribute("alt", "o-icon");
    computerIcon.setAttribute("src", xIconSrc);
    computerIcon.setAttribute("alt", "x-icon");
  }
  const cells = document.getElementsByClassName('cell');
  // change all displayed icons on the game grid 
  Array.from(cells).forEach((c) => {
    if (c.hasAttribute("data-type")) {
      console.log(c.getAttribute("data-type"));
      if (c.getAttribute("data-type") == 'player')
        c.children[0].setAttribute("src", playerIcon.src);
      else
        c.children[0].setAttribute("src", computerIcon.src);
    }
  });
}