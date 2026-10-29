
"use strict";

// DOM elements
const choiceButtons = document.querySelectorAll(".choice-btn");
const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");
const resultDisplay = document.querySelector("#result");
const roundResultDisplay = document.querySelector("#round-result");
const gameStatusDisplay = document.querySelector("#game-status");
const progressFill = document.querySelector("#progress-fill");
const restartButton = document.querySelector("#restart-btn");

// Game settings
const WINNING_SCORE = 5;

const CHOICES = Object.freeze([
    "rock",
    "paper",
    "scissors"
]);

// Game state
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

// Generate the computer's choice
function computerPlay() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

// Capitalize a choice for display
function formatChoice(choice) {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

// Determine the winner of a round
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "draw";
    }

    const playerWins =
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper");

    return playerWins ? "player" : "computer";
}

// Update the score display
function updateScoreboard() {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;

    const totalScore = playerScore + computerScore;
    const progress = (totalScore / (WINNING_SCORE * 2)) * 100;

    progressFill.style.width = `${progress}%`;
}

// Handle one round
function playGame(playerSelection) {
    if (gameOver) {
        return;
    }

    const computerSelection = computerPlay();
    const roundWinner = playRound(playerSelection, computerSelection);

    if (roundWinner === "player") {
        playerScore++;
        resultDisplay.textContent = "You won this round!";
        gameStatusDisplay.textContent = "The Evil AI is getting weaker...";
    } else if (roundWinner === "computer") {
        computerScore++;
        resultDisplay.textContent = "The Evil AI won this round!";
        gameStatusDisplay.textContent = "The Upside Down grows stronger...";
    } else {
        resultDisplay.textContent = "It's a draw!";
        gameStatusDisplay.textContent = "Neither side gives up.";
    }

    roundResultDisplay.textContent =
        `You chose ${formatChoice(playerSelection)}. ` +
        `The Evil AI chose ${formatChoice(computerSelection)}.`;

    updateScoreboard();

    if (playerScore >= WINNING_SCORE) {
        endGame("player");
    } else if (computerScore >= WINNING_SCORE) {
        endGame("computer");
    }
}

// Finish the game
function endGame(winner) {
    gameOver = true;

    choiceButtons.forEach((button) => {
        button.disabled = true;
    });

    restartButton.hidden = false;
    gameStatusDisplay.classList.add("winner");

    if (winner === "player") {
        resultDisplay.textContent = "YOU DEFEATED THE EVIL AI!";
        roundResultDisplay.textContent =
            "You survived the Upside Down. Hawkins is safe... for now.";
        gameStatusDisplay.textContent = "VICTORY! You are the hero of Hawkins.";
    } else {
        resultDisplay.textContent = "THE EVIL AI HAS WON!";
        roundResultDisplay.textContent =
            "The Upside Down has taken over. Will you try again?";
        gameStatusDisplay.textContent = "GAME OVER. The darkness wins... for now.";
    }
}





// Reset the game
function restartGame() {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;

    choiceButtons.forEach((button) => {
        button.disabled = false;
    });

    restartButton.hidden = true;
    gameStatusDisplay.classList.remove("winner");

    resultDisplay.textContent = "The Evil AI is waiting...";
    roundResultDisplay.textContent =
        "Choose your move to start the battle.";
    gameStatusDisplay.textContent =
        "The gate is open. Let the battle begin.";

    updateScoreboard();
}

// Connect buttons to the game
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const playerSelection = button.dataset.choice;
        playGame(playerSelection);
    });
});

// Connect the restart button
restartButton.addEventListener("click", restartGame);

// Initialize the scoreboard
updateScoreboard();
