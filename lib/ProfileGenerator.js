const inquirer = require("inquirer");
const chalk = require("chalk");
const Word = require("./Word");
const words = require("./words");

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

------------------

const inquirer = require('inquirer');
const fs = require('fs');

const generateMD = (answers) =>
`
![${answers.licence} Licence](https://img.shields.io/badge/Licence-${answers.licence}-blue)


# ${answers.title}


### Description
  ${answers.description}


### Table of Contents
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Licence](#Licence)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)

### Installation
  ${answers.installation}


### Usage
  ${answers.usage}


### Licence
  ${answers.licence}


### Contributing
GitHub profile of contributor(s):
  [${answers.contributing}](https://github.com/${answers.contributing})


### Tests
  ${answers.tests}


### Questions
If you have any questions about this repo, please direct them to:
  [${answers.questions}](mailto:${answers.questions})

`
;

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your project called?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe your project, particularly its background, context and features:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'List any steps needed to install your project:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide examples of your project being used:',
    },
    {
      type: 'list',
      name: 'licence',
      message: 'Provide the licence for your project:',
      choices: ['MIT', 'Apache', 'GPL'],
        },
    {
      type: 'input',
      name: 'contributing',
      message: 'What is your GitHub username?',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'What outcomes resulted from your tests?',
    },
    {
      type: 'input',
      name: 'questions',
      message: 'Please enter your best email address to direct questions about your project:',
    },
  ])

  .then((answers) => {
    const mdPageContent = generateMD(answers);

    fs.writeFile('README.md', mdPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created README.md!')
    );
  });