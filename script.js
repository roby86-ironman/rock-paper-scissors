
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

        if (answer === null) {
            return null;
        }

        const choice = answer.trim().toLowerCase();

        switch (choice) {
            case "rock":
                return "Rock";

            case "paper":
                return "Paper";

            case "scissors":
                return "Scissors";
        }

        alert(
            "🚨 INVALID MOVE, HUMAN! 🚨\n\n" +
            'Please enter "Rock", "Paper" or "Scissors".\n\n' +
            "Even the Evil AI understands these rules! 😂🤖"
        );
    }
}



const CHOICES = Object.freeze(["Rock", "Paper", "Scissors"]);

function computerPlay() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}



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

    //const player = playerSelection.trim().toLowerCase();
    //const computer = computerSelection.trim().toLowerCase();

    const player = playerSelection;
    const computer = computerSelection;

    const toTitleCase = str =>
        str.charAt(0).toUpperCase() + str.slice(1);

 
    if (
        playerSelection !== toTitleCase(player) ||
        computerSelection !== toTitleCase(computer)
    ) {
        return playRound(
            toTitleCase(player),
            toTitleCase(computer)
        );
    }


    if (playerSelection === computerSelection) {
        return "draw";
    }

    return WINNING_RULES[playerSelection] === computerSelection
        ? "player"
        : "computer";
}


function game() {

    let playerScore = 0;
    let computerScore = 0;

    
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

   
    while (playerScore < 3 && computerScore < 3) {

        console.log("🎮 NEW ROUND! FIGHT!");

  
        const playerSelection = getPlayerSelection();


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


        const computerSelection = computerPlay();

      
        const result = playRound(
            playerSelection,
            computerSelection
        );

        console.log("🧑 You chose: " + playerSelection);
        console.log("🤖 Evil AI chose: " + computerSelection);
       
        if (result === "player") {

            playerScore++;

            console.log("🎉 BOOM! You crushed the Evil AI this round! 🔥");

        } else if (result === "computer") {

            computerScore++;

            console.log("💀 The Evil AI strikes back! Better luck next time! 😈");

        } else if (result === "draw") {

            console.log("🤝 IT'S A DRAW! Great minds think alike! 😂");

        } else {


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

 
        console.log(
            "📊 SCOREBOARD | You: " + playerScore +
            " - Evil AI: " + computerScore
        );

        console.log("------------------------------------------------");
    }

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


game();
