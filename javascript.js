// defines the maximum round number
const roundNumber = 5;

//a function which returns a ramdom computer choice
function getComputerChoice(){
    const randomNumber = Math.random();
    let choice;

    //creates a ramdomized choice by the computer
    if (randomNumber < 0.333){
        choice = 'rock';
    } else if (randomNumber < 0.666){
        choice = 'paper';
    } else {
        choice = 'scissors';
    }

    // returns that choice by the function
    return choice;
}

// a function created to prompt user to enter an input
function getPlayerChoice(choice) {
    switch(choice) {
        case 'rock':
        case 'paper':
        case 'scissors': 
            return choice;
        default:
            alert('input was invalid, please enter valid choice')
            break;
        }
    }


//will pass the score for player and computer
function getScore (player, computer){
    //the first returned variable returns 0 if player wins or draw and 1 if player loses
    //same for the second variable for the computer
    switch (player) {
        case 'rock':
            switch (computer) {
                case 'rock': return [0, 0];
                case 'paper': return [0, 1];
                case 'scissors': return [1, 0];
            }
        case 'paper':
            switch (computer) {
                case 'rock': return [1, 0];
                case 'paper': return [0, 0];
                case 'scissors': return [0, 1];
            }
        case 'scissors':
            switch (computer) {
                case 'rock': return [0, 1];
                case 'paper': return [1, 0];
                case 'scissors': return [0, 0];
            }
    }

}

// declare score variable to keep track of player and computer's scores
let playerScore = 0;
let computerScore = 0;

//declare player result from each round whether win or lose
let playerResultText;

//a play round function which plays a single round and return the result
function playRound (playerChoice, computerChoice){
    const gameResult = getScore(playerChoice, computerChoice);
    const playerResult = gameResult[0];
    const computerResult = gameResult[1];
    console.log("You're choice is: " + playerChoice);
    console.log("Computer choice is: " + computerChoice);
    if (playerResult === 1) {
        console.log('You win this round')
        playerResultText = 'You won this round';
    } else if (computerResult === 1) {
        console.log('You lost this round')
        playerResultText = 'You lost this round';
    } else {
        console.log('It is a draw')
        playerResultText = 'You drew this round';
    }
    playerScore += playerResult;
    computerScore += computerResult;
}


//returns result of five rounds in string to fiveRoundTxt element
function winnerResult() {
    let winnerText;
    if (playerScore > computerScore) {
        winnerText = `Congratulations! you won ${playerScore} to ${computerScore}`;
    } else if (computerScore > playerScore) {
        winnerText = `You lost this ${playerScore} to ${computerScore}, better luck next time!`;
    } else {
        winnerText = 'You drew somehow, could be better or worse!';
    }
    return winnerText;
}

//delcare all DOM nodes
const choiceMenu = document.querySelector(".buttons-container");

const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");
const scissorsBtn = document.querySelector("#scissorsBtn");

let playerScoreTxt = document.querySelector("#playerScore"); 
let computerScoreTxt = document.querySelector("#computerScore");

const scoreBoard = document.querySelector(".scoreBoard");

const resultLog = document.querySelector(".resultLog");

//register use choice on button click
choiceMenu.addEventListener('click', (event) => {
    let target = event.target;

    let playerChoice;

    switch(target){
        case rockBtn:
            playerChoice = 'rock';
            break;
        case paperBtn:
            playerChoice = 'paper';
            break;
        case scissorsBtn:
            playerChoice = 'scissors';
            break;
        default:
            break;
    }

    const computerChoice = getComputerChoice();    

    playRound(playerChoice, computerChoice);


    //custom event contain info about player choice to use later
    let roundPlayed = new CustomEvent('roundPlayed', {
            detail: {
                playerChoice: playerChoice,
                computerChoice: computerChoice
            }
        }
    )

    scoreBoard.dispatchEvent(roundPlayed); 
    resultLog.dispatchEvent(roundPlayed);
})

scoreBoard.addEventListener('roundPlayed', () => {
    playerScoreTxt.textContent = `Player's score: ${playerScore}`;
    computerScoreTxt.textContent = `Computer's socre: ${computerScore}`;
})

resultLog.addEventListener('roundPlayed', (event) => {
    const roundLog = document.createElement("p");
    const playerRoundResult = document.createElement("p");
    const roundResult = document.createElement("div");

    roundLog.textContent = `Player's choice: ${event.detail.playerChoice}   Computer's Choice: ${event.detail.computerChoice}` 
    playerRoundResult.textContent = playerResultText;

    roundResult.appendChild(roundLog);
    roundResult.appendChild(playerRoundResult);

    resultLog.appendChild(roundResult);  

    //if game has been played more than five rounds result will be decided
    if (playerScore >= 5 || computerScore >= 5) {
        const winnerTxt = document.querySelector("p")
        winnerTxt.textContent = winnerResult();

        resultLog.appendChild(winnerTxt);

        playerScore = 0;
        computerScore = 0;
    }

})



