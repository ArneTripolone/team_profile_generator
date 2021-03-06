const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const fs = require('fs');

//let myManager = new Manager('Arne', 182859, 'arnetripolone@gmail.com')

const generateHTML = (answers) =>
` 
<fieldset class="profiles">
    <h3>${answers.name}<br>
    ${answers.occupation}</h3> 
    <p> Id: ${answers.id}</p>
    <p> Office/GitHub/School: ${answers.office_number || answers.school || answers.github}</p>
    <a class="card-body>Email: "href="mailto:${answers.email}">${answers.email}</a>
    <br>
</fieldset>
<br>
<br>
`
;

//generates question array in inquirer package 
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
//credit to George F for the 'when' property: 
//https://stackoverflow.com/questions/61691283/it-is-possible-to-create-branching-questions-with-inquirer
//if a user selected Engineer, for example, in the previous question, they are able to enter their GitHub username below
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
      type: "input",
      name: 'id',
      message: 'What is your ID?',
    },
    {
      type: "input",
      name: 'email',
      message: 'What is your email address?',
    },       
  ])
  
.then((answers) => {
    const HTMLPageContent = generateHTML(answers);
    //appends users responses to the team_profile.html file
    fs.appendFile('./dist/team_profile.html', HTMLPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created team_profile.html. To add another employee, run node ProfileGenerator again!')
    );
  }
)