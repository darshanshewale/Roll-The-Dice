import dice_1 from "url:/dice-1.png";
import dice_2 from "url:/dice-2.png";
import dice_3 from "url:/dice-3.png";
import dice_4 from "url:/dice-4.png";
import dice_5 from "url:/dice-5.png";
import dice_6 from "url:/dice-6.png";
import winner from "url:/winner.png";

import "./node_modules/core-js/stable";

("use strict");

const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");

const score0 = document.querySelector("#score-0");
const score1 = document.getElementById("score-1");
const dice_play = document.querySelector(".dice");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");

const btnnew = document.querySelector(".btn-new");
const btnroll = document.querySelector(".btn-roll");
const btnhold = document.querySelector(".btn-hold");

// score0.textContent = 0;
// score1.textContent = 0;

// this will set dice hidden at initial stage
dice_play.classList.add("hidden");

let scores, currentscore, activePlayer, playing;

// reset the game to inital stage
const reset = function () {
  // this will hold the scores of players in the below array
  scores = [0, 0];
  // this will make currentscore and well as active player to intial value to 0
  currentscore = 0;
  activePlayer = 0;

  // this will make false if player wins and games stop
  playing = true;

  // the content of the below has been changed to initial stage

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  // dice got  to hidden
  dice_play.classList.add("hidden");

  // set inital player to first player
  activePlayer = activePlayer = 0 ? 1 : 0;
  // remove if winner make it initial stage
  player0.classList.remove("player-winner");
  player1.classList.remove("player-winner");
  // make first player as active player
  player0.classList.add("player-active");
  player1.classList.remove("player-active");
};

reset();
// const scores = [0, 0];
// let currentscore = 0;
// let activePlayer = 0;
// let playing = true;

const switchplayer = function () {
  // this will change current score back to 0 again of active player

  document.getElementById(`current-${activePlayer}`).textContent = 0;
  // change the active player value
  activePlayer = activePlayer === 0 ? 1 : 0;
  // this will set the currentscore to zero again as get score of other player from initial play
  currentscore = 0;
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
};

// games get started by clicking on roll dice button
btnroll.addEventListener("click", function () {
  if (playing) {
    // this will generate the value from 0 t0 6
    let random = Math.trunc(Math.random() * 6) + 1;
    console.log(random);

    //first removed to hidden class added to dice to make it visible
    dice_play.classList.remove("hidden");
    // this will add images with respect to random value to dice in the ui
    if (random === 1) {
      num = dice_1;
    } else if (random === 2) {
      num = dice_2;
    } else if (random === 3) {
      num = dice_3;
    } else if (random === 4) {
      num = dice_4;
    } else if (random === 5) {
      num = dice_5;
    } else {
      num = dice_6;
    }

    dice_play.src = `${num}.png`;

    // check if value is not 1 then only execute the same
    if (random != 1) {
      // this will increase the score of active player
      currentscore += random;

      // display the score to the button to hold the value
      document.getElementById(`current-${activePlayer}`).textContent =
        currentscore;
    } else {
      // document.getElementById(`current-${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentscore = 0;
      // player0.classList.toggle("player-active");
      // player1.classList.toggle("player-active");

      // if dice value is equal to 1 then
      switchplayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  if (playing) {
    if (currentscore !== 0) {
      // score got added to active player after holding the value
      scores[activePlayer] += currentscore;

      // display the same for player in the ui
      document.getElementById(`score-${activePlayer}`).textContent =
        scores[activePlayer];

      // for winning condition
      if (scores[activePlayer] >= 100) {
        // stop the game as player win
        playing = false;
        // added trophy on dice
        dice_play.src = `${winner}.png`;

        console.log("winner");
        // changes background of winner
        document
          .querySelector(`.player-${activePlayer}`)
          .classList.add("player-winner");
      }
      // after holding the value also switch the player if less than 100
      switchplayer();
    }
  }
});

//on click to new game this will reset the game
btnnew.addEventListener("click", function () {
  console.log("new game");
  reset();
});
