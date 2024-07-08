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
        choice = 'scissors'
    }

    // returns that choice by the function
    return choice;
}

// a function created to prompt user to enter an input
function getPlayerChoice() {
    //will keep executing until the function returns
    while (true) {
        const choiceInput = prompt("please enter your choice. Choose from: 'rock', 'paper', or 'scissors'")
        const choice = choiceInput.toLowerCase();

        //if choice is valid, choice is returned by the function
        //if not the program will continue to reamain true and get exucuted in the while loop
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

//a play round function which plays a single round and return the result
function playRound (playerChoice, computerChoice){
    const gameResult = getScore(playerChoice, computerChoice);
    const playerResult = gameResult[0];
    const computerResult = gameResult[1];
    console.log("You're choice is: " + playerChoice);
    console.log("Computer choice is: " + computerChoice);
    if (playerResult === 1) {
        console.log('You win this round')
    } else if (computerResult === 1) {
        console.log('You lost this round')
    } else {
        console.log('It is a draw')
    }
    playerScore += playerResult;
    computerScore += computerResult;
}

//the play game function which calls the playRound function five times to play five games and declare the eventual winner
function playGame () {
    for (let i = 0; i < roundNumber; i++) {
        console.log("This is round number: "+ (i + 1));
        let playerChoice  = getPlayerChoice();
        let computerChoice = getComputerChoice();
        playRound(playerChoice, computerChoice);
    }
    console.log(playerScore);
    console.log(computerScore);
    result = (playerScore > computerScore) ? 'Congratulation! you win':
        (computerScore > playerScore) ? 'You lose!':
        'It\'s a tie!'

    console.log(result);
    playerScore = 0;
    computerScore = 0;
}