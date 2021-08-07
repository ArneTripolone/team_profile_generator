const inquirer = require('inquirer');
//const Employee = require('./Employee');
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
  </script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
  <link rel="stylesheet" href="style.css">
  <title>Document</title>
</head>
<body>
<div class="card" style="width: 18rem;">
  <h3>Name: ${answers.name}
    <br>
  <h3>Occupation: ${answers.occupation}
    <br>  
  <h3>ID: ${answers.id}
    <br>
  <h3>Email: ${answers.email}
    <br>
  <h3>${answers.office_number || answers.school || answers.github}
    <br>
</div>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/locale/da.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
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
      choices: ["Manager", "Intern", "Engineer"],
    },
//credit to George F for the 'when' property https://stackoverflow.com/questions/61691283/it-is-possible-to-create-branching-questions-with-inquirer
    {
      type: "input",
      name: "github",
      message: "Enter your github username:",
      when: (answers) => {
          if (answers.occupation === "Engineer") {
              return true;
          }
      }
    }, 
    {
      type: "input",
      name: "school",
      message: "Enter your school name:",
      when: (answers) => {
          if (answers.occupation === "Intern") {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "office_number",
      message: "Enter your office number:",
      when: (answers) => {
          if (answers.occupation === "Manager") {
              return true;
          }
      }
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
  ])
  
.then((answers) => {
    const HTMLPageContent = generateHTML(answers);

    fs.appendFile('teamProfile.html', HTMLPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created teamProfile.html!')
    );
  }
)

//./dist/teamProfile.html  - this is not quite right
//module.exports = team;
//console.log(myManager.value)

/*
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

