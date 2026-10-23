
/*
============================================================
ROCK, PAPER, SCISSORS VS THE EVIL AI 🤖💀
GROUP PROJECT

TEAM TASKS:
- ROBERTO: game(), scores, game loop and final winner.
- SIRAJ: player input, validation and Cancel handling.
- JEHOSUE: computerPlay() and playRound().

Ready to challenge the Evil AI?
May the best player win! 🏆
============================================================
*/


/*
============================================================
SIRAJ'S SECTION: PLAYER INPUT 🎮
============================================================

TODO FOR SIRAJ:
1. Review and complete getPlayerSelection().
2. Ask the player to enter Rock, Paper or Scissors.
3. Accept uppercase and lowercase letters.
4. Remove unnecessary spaces from the input.
5. If the input is invalid, display an error and ask again.
6. If the player presses Cancel, return null.

REQUIRED RETURN VALUES:
"Rock", "Paper", "Scissors", or null.
*/

function getPlayerSelection() {

    while (true) {

        const answer = prompt(
            "🎮 YOUR TURN, HUMAN!\n\n" +
            "Choose your weapon:\n" +
            "🪨 Rock\n" +
            "📄 Paper\n" +
            "✂️ Scissors\n\n" +
            "Type your choice below!\n" +
            "The Evil AI is watching you... 👀🤖"
        );

        // Stop safely if the player presses Cancel.
        if (answer === null) {
            return null;
        }

        const choice = answer.trim().toLowerCase();

        if (choice === "rock") {
            return "Rock";
        }

        if (choice === "paper") {
            return "Paper";
        }

        if (choice === "scissors") {
            return "Scissors";
        }

        alert(
            "🚨 INVALID MOVE, HUMAN! 🚨\n\n" +
            'Please enter "Rock", "Paper" or "Scissors".\n\n' +
            "Even the Evil AI understands these rules! 😂🤖"
        );
    }
}


/*
============================================================
JEHOSUE'S SECTION: COMPUTER CHOICE 🤖
============================================================

Reviewed & Completed by: Jehosue
Function: computerPlay()

Randomly selects and returns "Rock", "Paper", or "Scissors".

REQUIRED RETURN VALUES:
"Rock", "Paper" or "Scissors".
*/

const CHOICES = Object.freeze(["Rock", "Paper", "Scissors"]);

function computerPlay() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}


/*
============================================================
JEHOSUE'S SECTION: ROUND LOGIC ⚔️
============================================================

Reviewed & Completed by: Jehosue
Function: playRound(playerSelection, computerSelection)

Evaluates the round outcome according to Rock, Paper, Scissors rules.

REQUIRED RETURN VALUES:
"player"   = the player wins.
"computer" = the computer wins.
"draw"     = both choices are equal.

The returned value allows game() to update the scores.
*/

const WINNING_RULES = Object.freeze({
    Rock: "Scissors",
    Paper: "Rock",
    Scissors: "Paper"
});

function playRound(playerSelection, computerSelection) {

    if (
        typeof playerSelection !== "string" ||
        typeof computerSelection !== "string"
    ) {
        return "draw";
    }

    const player = playerSelection.trim().toLowerCase();
    const computer = computerSelection.trim().toLowerCase();

    const toTitleCase = str =>
        str.charAt(0).toUpperCase() + str.slice(1);

    // Normalize inputs to canonical TitleCase.
    if (
        playerSelection !== toTitleCase(player) ||
        computerSelection !== toTitleCase(computer)
    ) {
        return playRound(
            toTitleCase(player),
            toTitleCase(computer)
        );
    }

    // Draw condition.
    if (playerSelection === computerSelection) {
        return "draw";
    }

    // Determine the winner using the rules table.
    return WINNING_RULES[playerSelection] === computerSelection
        ? "player"
        : "computer";
}


/*
============================================================
ROBERTO'S SECTION: MAIN GAME FUNCTION 🏆
============================================================

The function:
1. Initializes both scores.
2. Explains the rules and how to open the console.
3. Repeats rounds until someone reaches 3 points.
4. Calls the functions written by the other teammates.
5. Updates the scores after each round.
6. Announces the final winner.

First to 3 points wins!
============================================================
*/

function game() {

    let playerScore = 0;
    let computerScore = 0;

    // Welcome the player before the first round.
    alert(
        "🤖 WELCOME TO ROCK, PAPER, SCISSORS! 🎮\n\n" +
        "Your opponent is the EVIL AI! 💀\n\n" +
        "Think you can beat a machine?\n" +
        "Prove it, human! 😈\n\n" +
        "🏆 FIRST TO 3 POINTS WINS! 🏆\n\n" +
        "📢 ROUND RESULTS AND SCORES APPEAR IN THE CONSOLE.\n\n" +
        "How to open the console:\n" +
        "Windows: F12 or Ctrl + Shift + J.\n" +
        "Mac: Cmd + Option + J.\n\n" +
        "⚔️ Press OK to enter the battlefield!"
    );

    console.clear();

    console.log("🤖💀 ROCK, PAPER, SCISSORS VS THE EVIL AI 💀🤖");
    console.log("⚔️ Let the battle begin!");
    console.log("🏆 First to 3 points wins. Draws award no points.");
    console.log("🪨 Rock | 📄 Paper | ✂️ Scissors");
    console.log("------------------------------------------------");

    // Continue while neither player has reached 3 points.
    while (playerScore < 3 && computerScore < 3) {

        console.log("🎮 NEW ROUND! FIGHT!");

        // Get the player's choice.
        const playerSelection = getPlayerSelection();

        // End the game safely if the player cancels.
        if (playerSelection === null) {

            console.log("🛑 The player has left the battlefield!");
            console.log("🤖 The Evil AI says: 'Too scared to continue?' 😈");

            alert(
                "🛑 GAME CANCELLED!\n\n" +
                "The battle is over for now.\n" +
                "The Evil AI will be waiting... 👀🤖\n\n" +
                "Come back when you're ready, champion! 💪"
            );

            return;
        }

        // Get the computer's random choice.
        const computerSelection = computerPlay();

        // Determine the winner of the current round.
        const result = playRound(
            playerSelection,
            computerSelection
        );

        console.log("🧑 You chose: " + playerSelection);
        console.log("🤖 Evil AI chose: " + computerSelection);

        // Update scores according to the round result.
        if (result === "player") {

            playerScore++;

            console.log("🎉 BOOM! You crushed the Evil AI this round! 🔥");

        } else if (result === "computer") {

            computerScore++;

            console.log("💀 The Evil AI strikes back! Better luck next time! 😈");

        } else if (result === "draw") {

            console.log("🤝 IT'S A DRAW! Great minds think alike! 😂");

        } else {

            // Handle an unexpected return value.
            console.error(
                "🚨 Unexpected result from playRound():",
                result
            );

            alert(
                "🚨 OOPS! Something went wrong!\n\n" +
                "Please check the console for details. 🔍"
            );

            return;
        }

        // Display the updated score after every round.
        console.log(
            "📊 SCOREBOARD | You: " + playerScore +
            " - Evil AI: " + computerScore
        );

        console.log("------------------------------------------------");
    }

    // Announce the final winner.
    if (playerScore === 3) {

        console.log("🏆👑 LEGENDARY VICTORY! 👑🏆");
        console.log("🎉 You defeated the Evil AI! Humanity is saved! 🌍");
        console.log("🤖 Evil AI: 'This cannot be happening... ERROR 404!' 😂");

        alert(
            "🏆🎉 YOU ARE THE CHAMPION! 🎉🏆\n\n" +
            "You defeated the Evil AI! 🤖💥\n\n" +
            "Humanity is saved... for now! 🌍😎\n\n" +
            "Go celebrate, legend! 👑🔥"
        );

    } else {

        console.log("💀 GAME OVER! The Evil AI has won!");
        console.log("🤖 Evil AI: 'Resistance is futile!' 😈");
        console.log("🔄 Time to train harder and try again, human!");

        alert(
            "💀 OH NO! THE EVIL AI WINS! 💀\n\n" +
            "The machines are taking over... 🤖🌍\n\n" +
            "Don't give up, human!\n" +
            "Train harder and challenge me again! 💪😂"
        );
    }
}


/*
============================================================
START THE GAME 🚀
============================================================

The game starts automatically when the browser loads script.js.
*/

game();
