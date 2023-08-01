let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
}; //default operator

//console.log(JSON.parse(localStorage.getItem('score')));
//localStorage.getItem('score') is a string, so JSON.parse will convert it back to an object.

/*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0,
    };
  }
  */

updateScoreElement();
/* document.querySelector(
                ".js-score"
              ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`; */
let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  /* compare the moves to get the result */
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  /* Update a score */
  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }
  /* After we update the score, we are going to save it in localStorage */
  // To save the value inside of the localStorage object, it has a method called setItem()
  localStorage.setItem("score", JSON.stringify(score));
  //object, but localStorage only supports strings)
  //by using the stringify, it will conver the JavaScript object score into JSON string. Then, it's ready to be saved in localStorage.

  updateScoreElement();
  /* score also updates on the page
          document.querySelector(
            ".js-score"
          ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`; */

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="./images/${playerMove}-emoji.png" class="move-icon" /><img
    src="./images/${computerMove}-emoji.png"
    class="move-icon"
  />
  Computer`;

  /* display the result in a pop up
          alert(
            `You picked ${playerMove}. Computer picked ${computerMove}. ${result}
  Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
          ); */
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

//Global variable
//let computerMove = "";

/*-- this code below only create a function, and it doesn't run the code inside --*/
function pickComputerMove() {
  /* computer randomly selects move */
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }

  //console.log(computerMove);

  return computerMove; //we're going to return ,whatever is inside computerMove, back to where we called this function.
}
