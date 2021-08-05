const inquirer = require('inquirer');
const Employee = require('./Employee');
const Manager = require('./Manager');
const Intern = require('./Intern');
const Engineer = require('./Engineer');
const fs = require('fs');

//let myManager = new Manager('Arne', 182859, 'arnetripolone@gmail.com')

const generateHTML = (answers) =>
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h3>${answers.name}
    <br>
  <h3>${answers.occupation}
    <br>  
  <h3>${answers.id}
    <br>
  <h3>${answers.email}
    <br>
  <h3>${answers.office}
    <br>
</body>
</html>
`
;

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
    {
      type: 'list',
      name: 'occupation',
      message: 'What is your occupation?',
      choices: ['Manager', 'Intern', 'Engineer'],
        //filter(val) {
          //return val.toLowerCase();
        //}
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your ID?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email address?',
    },
    {
      type: 'input',
      name: 'office',
      message: 'What is your office number?',
    },
  ])

  .then((answers) => {
    const HTMLPageContent = generateHTML(answers);

    fs.writeFile('teamProfile.html', HTMLPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created teamProfile.html!')
    );
  }
)

console.log(myManager.value)
/*
//module.exports = team;


//const inquirer = require("inquirer");
//const Word = require("./Employee");
// The Game constructor is responsible for keeping score and controlling the flow of the overall game

class Game {
  // Save a reference for `this` in `this` as `this` will change inside of inquirer
  constructor() {
    this.guessesLeft = 0;
  }
  // Sets the guesses to 10 and gets the next word
  play() {
    this.guessesLeft = 10;
    this.nextWord();
  }

  // Creates a new Word object using a random word from the array, asks the user for their guess
  nextWord() {
    const randWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randWord);
    console.log("\n" + this.currentWord.toString() + "\n");
    this.makeGuess();
  }

  // Uses inquirer to prompt the user for their guess
  makeGuess() {
    this.askForLetter().then(() => {
      // If the user has no guesses remaining after this guess, show them the word, ask if they want to play again
      if (this.guessesLeft < 1) {
        console.log(
          'No guesses left! Word was: "' +
            this.currentWord.getSolution() +
            '"\n'
        );
        this.askToPlayAgain();

        // If the user guessed all letters of the current word correctly, reset guessesLeft to 10 and get the next word
      } else if (this.currentWord.guessedCorrectly()) {
        console.log("You got it right! Next word!");
        this.guessesLeft = 10;
        this.nextWord();

        // Otherwise prompt the user to guess the next letter
      } else {
        this.makeGuess();
      }
    });
  }

  // Asks the user if they want to play again after running out of guessesLeft
  askToPlayAgain() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Play Again?"
        }
      ])
      .then(val => {
        // If the user says yes to another game, play again, otherwise quit the game
        if (val.choice) {
          this.play();
        } else {
          this.quit();
        }
      });
  }

  // Prompts the user for a letter
  askForLetter() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter!",
          // The users guess must be a number or letter
          validate: val => /[a-z1-9]/gi.test(val),          
        }
      ])
      .then(val => {
        // If the user's guess is in the current word, log that they chose correctly
        const didGuessCorrectly = this.currentWord.guessLetter(val.choice);
        if (didGuessCorrectly) {
          console.log(chalk.green("\nCORRECT!!!\n"));

          // Otherwise decrement `guessesLeft`, and let the user know how many guesses they have left
        } else {
          this.guessesLeft--;
          console.log(chalk.red("\nINCORRECT!!!\n"));
          console.log(this.guessesLeft + " guesses remaining!!!\n");
        }

        console.log(this.currentWord.toString() + "\n");
      });
  }

  // Logs goodbye and exits the node app
  quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  }
}

module.exports = Game;

*/