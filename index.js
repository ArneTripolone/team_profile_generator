const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const fs = require('fs');

//let myManager = new Manager('Arne', 182859, 'arnetripolone@gmail.com')

const generateHTML = (answers) =>
`
      <h5 class="card-title">Name: ${answers.name} 
      <p class="card-text">Occupation: ${answers.occupation} </p>
      <p class="card-text">Id: ${answers.id} </p>
      <a class="card-text" href="mailto:${answers.email}">${answers.email}</a> 
      <p class="card-text"></p> ${answers.office_number || answers.school || answers.github} </p>
    </div>
  </div>
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

    fs.appendFile('./dist/teamProfile.html', HTMLPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created teamProfile.html. To add another employee, run node ProfileGenerator again!')
    );
  }
)